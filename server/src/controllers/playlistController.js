import { Playlist } from "../models/playlist.js"
import mongoose from "mongoose";
import { Clip } from "../models/clip.js";
import { removeClipAudio } from "../helpers.js";

export const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(200).json(playlist);
  } catch(error) {
    res.status(400).json({error: error.message});
  }
}

export const getPlaylists = async (req, res) => {
  const playlists = await Playlist.find({}).sort({updatedAt: -1}); 
  res.status(200).json(playlists);
}

export const deletePlaylist = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Playlist not found"});
  
  const playlist = await Playlist.findById(id);
  if (!playlist) return res.status(400).json({error: "Playlist not found"});

  // delete audio
  const clips = await Clip.find({playlist: playlist.title}, "_id");
  clips.forEach((_, i) => {
    removeClipAudio(clips[i]._id);
  });
  
  await Playlist.deleteOne(playlist);
  const deletedClips = await Clip.deleteMany({playlist:playlist.title});
  res.status(200).json([playlist, {clipsDeleted: deletedClips}]);
}

export const patchPlaylist = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Playlist not found"});

  const playlist = await Playlist.findById(id);
  if (!playlist) return res.status(400).json({error: "Playlist not found"});

  const newPlaylist = await Playlist.updateOne({_id: id}, {...req.body});
  const clips = await Clip.updateMany({playlist: playlist.title}, {playlist: req.body.title});

  res.status(200).json(newPlaylist);
}
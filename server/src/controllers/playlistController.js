import { Playlist } from "../models/playlist.js"
import mongoose from "mongoose";

export const createPlaylist = async (req, res) => {
  try {
    await Playlist.create(req.body);
    res.status(200).json(req.body);
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

  const playlist = await Playlist.findByIdAndDelete(id);
  if (!playlist) return res.status(400).json({error: "Playlist not found"});

  res.status(200).json(playlist);
}

export const patchPlaylist = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Playlist not found"});

  const playlist = await Playlist.findByIdAndUpdate(id, {...req.body});
  if (!playlist) return res.status(400).json({error: "Playlist not found"});

  res.status(200).json(playlist);
}
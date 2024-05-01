import { Clip } from "../models/clip.js"
import mongoose from "mongoose";
import { verifyUrl, downloadVideo, removeClipAudio } from "../helpers.js";
import fs from 'node:fs'
import { Playlist } from "../models/playlist.js";

// Error codes are 0 for success, 1 for invalid video ID, 2 for invalid interval

export const validateClip = (req, res) => {
  verifyUrl(req.body.videoId, (status) => {
    // validate URL
    if (status === 0) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({Error: status});
    }
  })
}

export const createClip = (req, res) => {
  let {videoId, start, end, playlist} = req.body;
  const id = new mongoose.Types.ObjectId();

  let resBody = {
    clip: null,
    playlist: null
  }

  // download & process
  downloadVideo(videoId, start, end, id, async (status) => {
    if (status !== 0) {
      return res.status(500).json({Error: status});
    }
    resBody.clip = await Clip.create({...req.body, ...{_id: id}, ...{thumbnail: `https://img.youtube.com/vi/${videoId}/1.jpg`}});
    if (await Playlist.exists({title: playlist}) === null) {
      resBody.playlist = await Playlist.create({title: playlist})
    }
    res.status(200).json(resBody);
  }); 
}

export const getClips = async (req, res) => {
    const clips = await Clip.find({}).sort({createdAt: -1}); 
    res.status(200).json(clips);
}

export const getClip = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Clip not found"});

    const clip = await Clip.findById(id); 
    if (!clip) return res.status(400).json({error: "Clip not found"});

    res.status(200).json(clip);
}

export const deleteClip = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Clip not found"});

    const clip = await Clip.findByIdAndDelete(id);
    const except = removeClipAudio(id);
    if (except) console.log(except);
    if (!clip) return res.status(400).json({error: "Clip not found"});

    res.status(200).json(clip);
}

export const patchClip = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Clip not found"});

    const clip = await Clip.findByIdAndUpdate(id, {...req.body});
    if (!clip) return res.status(400).json({error: "Clip not found"});
    
    res.status(200).json(clip);
}

export const getClipsByPlaylist = async (req, res) => {
    const playlist = req.params.playlist;
    const clips = await Clip.find({playlist: playlist}).sort({createdAt: -1}); 
    res.status(200).json(clips);
}

export const getClipAudio = async (req, res) => {
  try {
    const id = req.params.id;
    if (await id === undefined) return;
    const audioPath = `./audio/${id}.mp3` 
    const stat = fs.statSync(audioPath);

    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
      });
    const readStream = fs.createReadStream(audioPath);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).json({error: error})
  }
  
}
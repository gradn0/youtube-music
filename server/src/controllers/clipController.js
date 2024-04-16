import { Clip } from "../models/clip.js"
import mongoose from "mongoose";
import { downloadVideo } from "../helpers.js";
import fs from 'node:fs'
import path from "node:path";

export const createClip = async (req, res) => {
    let {videoId, start, end} = req.body
    let clip;
    try {
        clip = await Clip.create(req.body);
        res.status(200).json(req.body);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
    downloadVideo(videoId, start, end, clip.id);
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
    const audioPath = `./audio/${id}.mp3` 
    const stat = fs.statSync(audioPath);

    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
      });
    const readStream = fs.createReadStream(audioPath);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
  
}
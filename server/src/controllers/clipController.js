import { Clip } from "../models/clip.js"
import mongoose from "mongoose";
import { downloadVideo } from "../helpers.js";

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

    const clip = await Clip.findByIdAndUpdate(id, {...req.body})
    if (!clip) return res.status(400).json({error: "Clip not found"});
    
    res.status(200).json(clip);
}
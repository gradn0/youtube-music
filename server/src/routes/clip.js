import express from 'express'
export const clipRouter = express.Router();
import { createClip, getClips, getClip, deleteClip, patchClip, getClipsByPlaylist, getClipAudio } from '../controllers/clipController.js';

clipRouter.get("/", (req, res) => {
    getClips(req, res);
})

clipRouter.post("/", (req, res) => {
    createClip(req, res);
})

clipRouter.get("/:id", (req, res) => {
    getClip(req, res);
})

clipRouter.delete("/:id", (req, res) => {
    deleteClip(req, res);
})

clipRouter.patch("/:id", (req, res) => {
    patchClip(req, res);
})

clipRouter.get("/byPlaylist/:playlist", (req, res) => {
    getClipsByPlaylist(req, res);
})

clipRouter.get("/audio/:id", (req, res) => {
    getClipAudio(req, res);
})
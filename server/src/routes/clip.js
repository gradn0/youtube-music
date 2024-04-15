import express from 'express'
export const router = express.Router();
import { createClip, getClips, getClip, deleteClip, patchClip } from '../controllers/clipController.js';

router.get("/", (req, res) => {
    getClips(req, res);
})

router.post("/", (req, res) => {
    createClip(req, res);
})

router.get("/:id", (req, res) => {
    getClip(req, res);
})

router.delete("/:id", (req, res) => {
    deleteClip(req, res);
})

router.patch("/:id", (req, res) => {
    patchClip(req, res);
})

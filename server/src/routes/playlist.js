import express from 'express'
export const playlistRouter = express.Router();
import { createPlaylist, getPlaylists, deletePlaylist, patchPlaylist } from '../controllers/playlistController.js';

playlistRouter.get("/", (req, res) => {
    getPlaylists(req, res);
})

playlistRouter.post("/", (req, res) => {
    createPlaylist(req, res);
})

playlistRouter.delete("/:id", (req, res) => {
    deletePlaylist(req, res);
})

playlistRouter.patch("/:id", (req, res) => {
    patchPlaylist(req, res);
})
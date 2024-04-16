import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true
    }
}, {timestamps: true})

export const Playlist = mongoose.model('playlist', playlistSchema);
import mongoose from "mongoose";

const clipSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    playlist: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Clip = mongoose.model('clip', clipSchema);
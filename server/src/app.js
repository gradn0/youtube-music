import express from 'express'
import 'dotenv/config'
import 'mongoose'
import {clipRouter} from './routes/clip.js'
import {playlistRouter} from './routes/playlist.js'
import mongoose from 'mongoose'
import { userRouter } from './routes/user.js'
import cors from "cors"

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/clips", clipRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, '0.0.0.0', (req, res) => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })


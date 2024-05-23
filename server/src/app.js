import express from 'express'
import 'dotenv/config'
import 'mongoose'
import {clipRouter} from './routes/clip.js'
import {playlistRouter} from './routes/playlist.js'
import mongoose from 'mongoose'
import { userRouter } from './routes/user.js'
import cors from "cors"
import https from 'https'
import fs from 'fs'

const app = express();
const PORT = process.env.PORT;
const httpsOptions = {
  key: fs.readFileSync('src/ssl/key.pem'),
  cert: fs.readFileSync('src/ssl/cert.pem')
}
const httpsServer = https.createServer(httpsOptions, app);
const corsOptions = {
  origin: process.env.CORS_ORIGIN
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/clips", clipRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    httpsServer.listen(PORT, (req, res) => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })


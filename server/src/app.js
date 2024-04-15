import express, { json } from 'express'
import 'dotenv/config'
import 'mongoose'
import {router as clipRouter} from './routes/clip.js'
import mongoose from 'mongoose'

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/clips", clipRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })


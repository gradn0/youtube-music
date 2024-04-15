import express from 'express'
import 'dotenv/config'
import {exec} from'child_process'

const app = express();
const PORT = process.env.PORT;

const downloadVideo = (url, start, end) => {
    exec(`python src/downloader.py ${url} ${start} ${end}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    downloadVideo("https://www.youtube.com/watch?v=FVl1BMpLq8g", 1000, 10000)
  })
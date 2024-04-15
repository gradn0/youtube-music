import {exec} from'child_process'

export const downloadVideo = (videoId, start, end, clipId) => {
    exec(`python src/downloader.py https://www.youtube.com/watch?v=${videoId} ${start} ${end} ${clipId}`, 
    (error, stdout, stderr) => {
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
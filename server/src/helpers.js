import {exec} from'child_process'

export const downloadVideo = async (videoId, start, end, clipId, cb) => {
  exec(`python src/downloader.py https://www.youtube.com/watch?v=${videoId} ${start} ${end} ${clipId}`, (error, stdout, stderr) => {
    if (error) {
      cb(stderr);
      return;
    }
    if (stderr) {
      cb(stderr);
      return;
    }
    cb(0);
  });  
}
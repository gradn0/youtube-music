from pytube import YouTube
import sys, os
from pydub import AudioSegment

AUDIO_DIR = "audio/"

if __name__ == "__main__":
    if (len(sys.argv) != 4): 
        print("Usage: python downloader.py <video url> <start time (s)> <end time (s).")
        exit()
    url = sys.argv[1] 
    start = int(sys.argv[2])
    end = int(sys.argv[3])
   
    try:
        yt = YouTube(url)
        stream = yt.streams.filter(only_audio=True, file_extension='mp4').first()
        stream.download(AUDIO_DIR, "file.mp4")
    except:
        print("Failed to download video.")

    try:
        clip = AudioSegment.from_file(AUDIO_DIR + "/file.mp4", format="mp4")[start:end]
        file_handle = clip.export(AUDIO_DIR + "/clip.mp3", format="mp3")
        os.remove(AUDIO_DIR + "file.mp4")
    except:
        print("Failed to process audio.")
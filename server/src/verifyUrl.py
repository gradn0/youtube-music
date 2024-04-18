from pytube import YouTube
import sys

if __name__ == "__main__":
    if (len(sys.argv) != 2): 
        print("Usage: python verifyUrl.py <video url>.")
        exit()
    url = sys.argv[1] 

    try:
      yt = YouTube(url)
    except:
      sys.stderr.write("Invalid url")
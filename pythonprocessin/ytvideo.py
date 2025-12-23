import yt_dlp
import os

outputdir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backend', 'yt_uploads')

def download_youtube_video(url, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
    
    # Clear existing files
    for f in os.listdir(output_dir):
        os.remove(os.path.join(output_dir, f))

    ydl_opts = {
        # More flexible format selection that falls back gracefully
        "format": "bv*+ba/b",  # best video + best audio, or best combined
        "outtmpl": os.path.join(output_dir, "video.%(ext)s"),
        "merge_output_format": "mp4",
        # Let yt-dlp handle the merging automatically
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


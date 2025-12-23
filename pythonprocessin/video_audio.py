from moviepy import VideoFileClip
import os
import glob
#this code is written by claude i dondt know how to write this code (i am dumb)

def video_to_audio():
    print("start video_to_audio")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(base_dir)
    
    expected_video = os.path.join(project_root, "backend", "uploads", "video.mp4")
    audio_dir = os.path.join(base_dir, "audio")

    os.makedirs(audio_dir, exist_ok=True)

    
    if os.path.exists(expected_video):
        video_path = expected_video
    else:
        
        uploads_dir = os.path.join(project_root, "backend", "uploads")
        candidates = []
        if os.path.isdir(uploads_dir):
            candidates = glob.glob(os.path.join(uploads_dir, "*.mp4"))

        # also look in the local audio dir (some users save uploads there)
        if not candidates:
            candidates = glob.glob(os.path.join(audio_dir, "*.mp4"))

        if candidates:
            video_path = candidates[0]
            print(f"Using fallback video file: {video_path}")
        else:
            raise FileNotFoundError(
                "No video file found. Checked:\n"
                f"  - {expected_video}\n"
                f"  - {uploads_dir}\n"
                f"  - {audio_dir}\n"
                "Place a .mp4 file named 'video.mp4' in backend/uploads or provide an mp4 in those folders."
            )

    print("Video file:", video_path)

    video = VideoFileClip(video_path)

    if video.audio is None:
        print("No audio track found in video")
        video.close()
        return None
    else:
        audio_path = os.path.join(audio_dir, "output_audio.mp3")
        video.audio.write_audiofile(audio_path)
        print("Audio extracted:", audio_path)
        video.close()
        return audio_path
    
def video_to_audio_yt():
    print("start video_to_audio_yt")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(base_dir)
    
    expected_video = os.path.join(project_root, "backend", "yt_uploads", "video.mp4")
    audio_dir = os.path.join(base_dir, "audio")

    os.makedirs(audio_dir, exist_ok=True)

    
    if os.path.exists(expected_video):
        video_path = expected_video
    else:
        
        uploads_dir = os.path.join(project_root, "backend", "uploads")
        candidates = []
        if os.path.isdir(uploads_dir):
            candidates = glob.glob(os.path.join(uploads_dir, "*.mp4"))

        
        if not candidates:
            candidates = glob.glob(os.path.join(audio_dir, "*.mp4"))

        if candidates:
            video_path = candidates[0]
            print(f"Using fallback video file: {video_path}")
        else:
            raise FileNotFoundError(
                "No video file found. Checked:\n"
                f"  - {expected_video}\n"
                f"  - {uploads_dir}\n"
                f"  - {audio_dir}\n"
                "Place a .mp4 file named 'video.mp4' in backend/uploads or provide an mp4 in those folders."
            )

    print("Video file:", video_path)

    video = VideoFileClip(video_path)

    if video.audio is None:
        print("No audio track found in video")
        video.close()
        return None
    else:
        audio_path = os.path.join(audio_dir, "output_audio.mp3")
        video.audio.write_audiofile(audio_path)
        print("Audio extracted:", audio_path)
        video.close()
        return audio_path

import whisper
import os

model = whisper.load_model("base")


def audio_to_text(audio_path=None):
   base_dir = os.path.dirname(os.path.abspath(__file__))
   if audio_path is None:
      audio_path = os.path.join(base_dir, "audio", "output_audio.mp3")

   if not os.path.exists(audio_path):
      raise FileNotFoundError(f"Audio file not found: {audio_path}")

   result = model.transcribe(audio_path)
   return result["text"]


def audio_only(audio_path=None):
   base_dir = os.path.dirname(os.path.abspath(__file__))
   if audio_path is None:
      audio_path = os.path.join(base_dir, "audio", "output_audio.mp3")

   if not os.path.exists(audio_path):
      raise FileNotFoundError(f"Audio file not found: {audio_path}")

   result = model.transcribe(audio_path)
   return result["text"]
from flask import Flask, request, jsonify
from transformers import pipeline
from PIL import Image
import pytesseract
import io
from audio_text import audio_to_text,audio_only    
from api import summarize_text
from video_audio import video_to_audio,video_to_audio_yt
import pdfplumber   
import os
from ytvideo import download_youtube_video
from rag_pipeline import  build_context, rag_answer
from chunker import chunk_text
from embedding import embed
from vector_db import VectorStore
from vectordb import build_faiss_index
import numpy as np
pytesseract.pytesseract.tesseract_cmd=r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
app = Flask(__name__)
@app.route('/img_txt', methods=['POST'])
def img_txt():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    img = Image.open(io.BytesIO(file.read()))
    text = pytesseract.image_to_string(img)
    summary=summarize_text(text)
    return jsonify({'text': summary})
@app.route('/video_txt', methods=['POST'])
def video_txt():
    try:
        audio_path = video_to_audio()
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Video processing failed', 'detail': str(e)}), 500

    try:
        
        text = audio_to_text(audio_path) if audio_path else ''
        summary=summarize_text(text)
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Audio transcription failed', 'detail': str(e)}), 500

    return jsonify({'text': summary})
@app.route('/audio_txt', methods=['POST'])
def audio_txt():
    
    audio_path=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'backend','audio','uploadedaudio.mp3')  
    print("audio pat ",audio_path)    
    text=audio_only(audio_path)
    summary=summarize_text(text)
    return jsonify({'text': summary})
@app.route('/text_txt', methods=['POST'])
def txt_summarize():
    
    data = request.json
    
    text = data['text']
    summary = summarize_text(text)
    return jsonify({'summary': summary})
@app.route('/pdf_txt', methods=['POST'])
def pdf_chunk():
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    main_dir = os.path.dirname(parent_dir)
   
    pdf_path = os.path.join(main_dir, 'backend', 'resourse', 'resourse.pdf')

    print("actual path", pdf_path)
    if not os.path.exists(pdf_path):
        return jsonify({'error': f'PDF not found at {pdf_path}'}), 400

    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text() or ''
                text += page_text
            summary=summarize_text(text)
    except Exception as e:
        return jsonify({'error': 'Failed to read PDF', 'detail': str(e)}), 500

    return jsonify({'text': summary})


@app.route('/yt_video_txt', methods=['POST'])
def yt_vid_txt():
    data=request.json
    yt_url=data['yt_url']
    output_dir=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'backend','yt_uploads')
    download_youtube_video(yt_url, output_dir)
    try:
        audio_path = video_to_audio_yt()
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Video processing failed', 'detail': str(e)}), 500

    try:
        
        text = audio_to_text(audio_path) if audio_path else ''
        summary=summarize_text(text)
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Audio transcription failed', 'detail': str(e)}), 500

    return jsonify({'text': summary})
@app.route('/text_txt', methods=['POST'])
def text_txt():
    data=request.json
    text=data['text']
    summary=summarize_text(text)
    return jsonify({'text': text,'summary':summary})


@app.route('/pdf-scrap/upload', methods=['POST'])
def pdf_upload():
    query = request.form.get("query")

    pdf_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        'backend',
        'public',
        'uploadedpdf.pdf'
    )
    with pdfplumber.open(pdf_path) as pdf:
        text = ''.join(page.extract_text() or '' for page in pdf.pages).strip()

   
    if not text:
        return jsonify({"error": "No text could be extracted from the PDF. It might be empty or an image-based PDF."}), 400

    chunks = chunk_text(text)
    
   
    if not chunks:
        return jsonify({"error": "Failed to create text chunks."}), 400

    embeddings = embed(chunks)
    
    
    if embeddings.shape[0] == 0:
        return jsonify({"error": "Failed to generate embeddings."}), 500

    store = VectorStore(embeddings, chunks)
    docs = store.search(query, top_k=5)
    context = build_context(docs)
    answer = rag_answer(context, query, summarize_text)

    return jsonify({"answer": answer})



if __name__ == '__main__':
    app.run(debug=True)

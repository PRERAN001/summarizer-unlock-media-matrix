# Summarizer – Unlock Media Matrix

Summarizer – Unlock Media Matrix is an AI-powered platform designed to summarize and understand multiple forms of data available across the internet, including images, videos, PDFs, audio files, and YouTube videos.

The project focuses on content extraction, semantic search, and intelligent question answering using modern AI pipelines.

---

## Features

### Multi-Modal Summarization
The system supports summarization of:
- Images (OCR-based)
- Audio files
- Video files
- YouTube videos
- PDF documents

---

### PDF Playground
The PDF Playground is an interactive environment where users can:
- Upload a PDF
- Ask questions related to the document
- Receive accurate, context-aware answers

This feature is implemented using a Retrieval-Augmented Generation (RAG) pipeline.

---

## PDF Search and RAG Pipeline

The PDF Playground follows these steps:

1. Load the PDF  
2. Extract text using pdfplumber  
3. Chunk the extracted text  
4. Generate embeddings for each chunk  
5. Store embeddings in FAISS (Facebook AI Similarity Search)  
6. Retrieve relevant chunks based on the user query  
7. Build contextual input  
8. Generate the final answer using Google Gemini  

---

## Deployment Note

The project could not be deployed on some free-tier platforms due to memory limitations caused by local embedding models.

To address this issue:
- API-based embeddings using Google Gemini are supported

Start the Frontend
cd frontend
npm install
npm run dev

Start the Backend
cd backend
npm install
npx nodemon server.js

Start the Python AI Service
cd pythonprocessin
pip install -r requirements.txt
python app.py

Environment Variables

Three environment configurations are required.
- Heavy local machine learning models are avoided during server startup
- The project

pythonprocessin/.env
GEMINI_API_KEY="your_gemini_api_key"

frontend/.env
VITE_BASE_URL=http://localhost:3000

backend/.env
BASE_URL=http://localhost:5000

Notes

Ensure that Tesseract OCR and FFmpeg are installed on the system or within the Docker environment.

Environment variable files should not be committed to version control.

The project is modular and can be extended to support additional data sources.

# embedding.py
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(texts):
    # Ensure texts is a list if it's a single string
    if isinstance(texts, str):
        texts = [texts]
        
    emb = model.encode(texts)
    # FAISS requires float32
    emb = np.array(emb).astype("float32")
    
    if emb.ndim == 1:
        emb = emb.reshape(1, -1)
    return emb
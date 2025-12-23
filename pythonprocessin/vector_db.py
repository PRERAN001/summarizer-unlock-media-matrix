# vector_db.py
import faiss
import numpy as np # Add numpy import
from embedding import embed

class VectorStore:
    def __init__(self, embeddings, documents):
        if embeddings.shape[0] == 0:
            raise ValueError("Cannot initialize VectorStore with empty embeddings.")
            
        self.dim = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(self.dim)
        self.index.add(embeddings)
        self.documents = documents

    def search(self, query, top_k=5):
        query_emb = embed([query]) # This returns a (1, 384) float32 array
        
        # Safety check: Ensure query dimension matches index dimension
        if query_emb.shape[1] != self.dim:
            raise ValueError(f"Query dim {query_emb.shape[1]} != Index dim {self.dim}")
            
        distances, indices = self.index.search(query_emb, top_k)
        return [self.documents[i] for i in indices[0]]
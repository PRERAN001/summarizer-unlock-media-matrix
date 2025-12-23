import numpy as np
import faiss

def build_faiss_index(embeddings):
    embeddings = np.array(embeddings).astype("float32")

    # If single vector → convert to 2D
    if embeddings.ndim == 1:
        embeddings = embeddings.reshape(1, -1)

    if embeddings.ndim != 2:
        raise ValueError(f"Invalid embedding shape: {embeddings.shape}")

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    return index

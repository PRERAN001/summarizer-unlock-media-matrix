def build_context(docs: list[str]) -> str:
    return "\n\n".join(docs)

def rag_answer(context: str, query: str, llm_call):
    prompt = f"""
You are an AI assistant.
Answer using ONLY the context below.

Context:
{context}

Question:
{query}

Answer:
"""
    return llm_call(prompt)

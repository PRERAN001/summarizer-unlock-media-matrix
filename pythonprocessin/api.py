import google.generativeai as genai
genai.configure(api_key="AIzaSyCrHsYvvzVgZo7O4P7Ie6oexfE05vXmbGQ")
def summarize_text(text):
    model = genai.GenerativeModel("gemini-2.5-flash-lite")

    prompt = f"""
    Summarize the following text clearly and concisely:
    be short and precise.

    {text}
    """

    response = model.generate_content(prompt)
    return response.text
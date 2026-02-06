from crewai import LLM
import os

# Define the Gemini LLM using the native CrewAI class
# This automatically handles the "provider check" by using the 'gemini/' prefix.
gemini_llm = LLM(
    model="gemini/gemini-1.5-pro",
    api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.7
)

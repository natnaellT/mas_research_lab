# MAS Research Lab: Future Tech Insight Lab

A sophisticated Multi-Agent System (MAS) designed to orchestrate a squad of specialized AI agents for deep-tech research, futuristic forecasting, and strategic analysis.

## 🚀 Overview

The Future Tech Insight Lab is a premium research platform powered by **CrewAI** and **Gemini 2.0**. It deploys an autonomous team of researchers to decode emerging technologies, predict their 50-year trajectory, and provide concrete strategic business advice.

### Key Features
- **Grand Agent Squad**: 6 specialized AI roles including a Futurist and a Strategic Advisor.
- **Sequential Research Flow**: A robust pipeline from raw data gathering to a final executive report.
- **Premium UI**: A glassmorphism-inspired Next.js frontend with real-time agent status tracking.
- **PDF Export**: Generate professional multi-page intelligence reports from research findings.

## 🏗️ Architecture

The system is split into a **FastAPI** backend and a **Next.js** frontend.

### The Agent Squad
1.  **Senior Tech Researcher**: Scours the web (via Serper) for the latest breakthroughs.
2.  **Tech Industry Analyst**: Evaluates technical feasibility and market potential.
3.  **Futurist Visionary**: Extrapolates trends into vivid 2075 sci-fi scenarios.
4.  **Strategic Business Advisor**: Develops GTM strategies and identifies $1B opportunities.
5.  **Ethical & Safety Critic**: Audits findings for bias, safety, and societal impact.
6.  **Senior Tech Editor**: Synthesizes all inputs into a polished "Grand Report".

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, CrewAI, LangChain, Google Gemini API.
- **Frontend**: Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Lucide React.
- **Export**: jsPDF, html2canvas.

## 🚦 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- API Keys: `GOOGLE_API_KEY` (Gemini), `SERPER_API_KEY` (Search).

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory:
```env
GOOGLE_API_KEY=your_key_here
SERPER_API_KEY=your_key_here
```
Run the server:
```bash
python main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

## 🧪 Verification & Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Linting
```bash
cd frontend
npm run lint
```

## 📄 License
MIT

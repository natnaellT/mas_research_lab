from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from crewai.crew import Crew
from crewai.process import Process
import os
from agents import ResearchAgents
from tasks import ResearchTasks
from tools import SearchTools
import uuid

app = FastAPI()

class ResearchRequest(BaseModel):
    topic: str

# In-memory store for run status (for demo purposes)
job_store = {}

def kick_off_crew(job_id: str, topic: str):
    try:
        job_store[job_id] = {"status": "RUNNING", "logs": [], "result": None}
        
        agents = ResearchAgents()
        tasks = ResearchTasks()

        # Agents
        researcher = agents.research_agent()
        analyst = agents.analyst_agent()
        futurist = agents.futurist_agent()
        strategist = agents.strategy_agent()
        critic = agents.critic_agent()
        writer = agents.writer_agent()

        # Tasks
        research_task = tasks.research_task(researcher, topic)
        analysis_task = tasks.analysis_task(analyst, [research_task])
        future_task = tasks.future_forecast_task(futurist, [analysis_task])
        strategy_task = tasks.strategy_task(strategist, [analysis_task, future_task])
        critique_task = tasks.critique_task(critic, [analysis_task, strategy_task])
        write_task = tasks.writing_task(writer, [research_task, analysis_task, future_task, strategy_task, critique_task])

        crew = Crew(
            agents=[researcher, analyst, futurist, strategist, critic, writer],
            tasks=[research_task, analysis_task, future_task, strategy_task, critique_task, write_task],
            process=Process.sequential,
            verbose=True
        )

        result = crew.kickoff()
        job_store[job_id]["status"] = "COMPLETED"
        job_store[job_id]["result"] = str(result)
        
    except Exception as e:
        job_store[job_id]["status"] = "FAILED"
        job_store[job_id]["error"] = str(e)

@app.post("/api/research")
async def start_research(request: ResearchRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    background_tasks.add_task(kick_off_crew, job_id, request.topic)
    return {"job_id": job_id, "status": "STARTED"}

@app.get("/api/research/{job_id}")
async def get_research_status(job_id: str):
    if job_id not in job_store:
        raise HTTPException(status_code=404, detail="Job not found")
    return job_store[job_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

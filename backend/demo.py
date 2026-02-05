from dotenv import load_dotenv
load_dotenv()

from agents import ResearchAgents
from tasks import ResearchTasks
from crewai import Crew, Process

def run_demo():
    print("## Starting Multi-Agent Research Lab Demo ##")
    print("---------------------------------------------")

    topic = "The Future of Quantum Internet"
    print(f"Topic: {topic}")

    agents = ResearchAgents()
    tasks = ResearchTasks()

    # Instantiate Agents
    researcher = agents.research_agent()
    analyst = agents.analyst_agent()
    critic = agents.critic_agent()
    writer = agents.writer_agent()

    # Instantiate Tasks
    research_task = tasks.research_task(researcher, topic)
    analysis_task = tasks.analysis_task(analyst, [research_task])
    critique_task = tasks.critique_task(critic, [analysis_task])
    write_task = tasks.writing_task(writer, [critique_task])

    # Create Crew
    crew = Crew(
        agents=[researcher, analyst, critic, writer],
        tasks=[research_task, analysis_task, critique_task, write_task],
        process=Process.sequential,
        verbose=True
    )

    result = crew.kickoff()

    print("\n\n########################")
    print("## FINAL REPORT ##")
    print("########################\n")
    print(result)

if __name__ == "__main__":
    run_demo()

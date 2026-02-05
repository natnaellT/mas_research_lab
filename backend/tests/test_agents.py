import pytest
from ..agents import ResearchAgents
from crewai import Agent

def test_research_agent_creation():
    agents = ResearchAgents()
    agent = agents.research_agent()
    assert isinstance(agent, Agent)
    assert agent.role == 'Senior Tech Researcher'
    assert 'future' in agent.backstory

def test_analyst_agent_creation():
    agents = ResearchAgents()
    agent = agents.analyst_agent()
    assert isinstance(agent, Agent)
    assert agent.role == 'Tech Industry Analyst'

def test_critic_agent_creation():
    agents = ResearchAgents()
    agent = agents.critic_agent()
    assert isinstance(agent, Agent)
    assert agent.role == 'Ethical & Safety Critic'

def test_writer_agent_creation():
    agents = ResearchAgents()
    agent = agents.writer_agent()
    assert isinstance(agent, Agent)
    assert agent.role == 'Senior Tech Editor'

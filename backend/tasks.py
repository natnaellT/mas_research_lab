from crewai import Task

class ResearchTasks:
    def research_task(self, agent, topic):
        return Task(
            description=f"""Conduct a comprehensive research on the latest developments in {topic}.
            Identify key players, recent breakthroughs, and current challenges.
            Collect concrete data and recent news articles (within the last year).""",
            expected_output=f"A detailed research summary on {topic} with at least 5 key findings and citations.",
            agent=agent
        )

    def analysis_task(self, agent, context):
        return Task(
            description=f"""Analyze the provided research data.
            Evaluate the technical feasibility and market potential.
            Identify 3 major opportunities and 3 major risks (technical/market).""",
            expected_output="A structured analysis report identifying opportunities, risks, and feasibility.",
            agent=agent,
            context=context
        )
    
    def critique_task(self, agent, context):
        return Task(
            description=f"""Review the research and analysis for ethical concerns.
            Identify potential biases, privacy issues, or negative societal impacts.
            Suggest mitigations for identified risks.""",
            expected_output="An ethical review document highlighting safety/ethics risks and mitigations.",
            agent=agent,
            context=context
        )

    def future_forecast_task(self, agent, context):
        return Task(
            description=f"""Based on the analysis, create a "Scenario 2075".
            Extrapolate the current trends 50 years into the future.
            Describe a day in the life of a person living with this technology in 2075.
            Be creative, vivid, and speculative but grounded in the technical analysis.""",
            expected_output="A vivid 'Vision 2075' scenario description.",
            agent=agent,
            context=context
        )

    def strategy_task(self, agent, context):
        return Task(
            description=f"""Based on the analysis and future forecast, develop a high-level strategic roadmap.
            Identify 3 "Billion Dollar Opportunities".
            Identify 3 "Existential Threats" to current incumbents.
            Recommend a concrete "Go-to-Market" strategy for a startup in this space.""",
            expected_output="A strategic roadmap with opportunities, threats, and GTM strategy.",
            agent=agent,
            context=context
        )


    def writing_task(self, agent, context):
        return Task(
            description=f"""Synthesize the research, analysis, future vision, strategic advice, and ethical critique into a final Grand Report.
            The tone should be authoritative yet inspiring.
            
            Structure the report as follows:
            1. Executive Summary
            2. Research Findings (The Now)
            3. Technical Analysis (The How)
            4. Vision 2075 (The Future) - Include the Futurist's scenario.
            5. Strategic Roadmap (The Business) - Include the Strategist's advice.
            6. Ethical Considerations (The Conscience)
            7. Conclusion
            
            Use Markdown formatting with clear headings, bullet points, and code blocks if relevant.""",
            expected_output="A polished, comprehensive Grand Report in Markdown format.",
            agent=agent,
            context=context
        )

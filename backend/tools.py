from crewai.tools import BaseTool
from langchain_community.utilities import GoogleSerperAPIWrapper
import os

class SearchTool(BaseTool):
    name: str = "Search"
    description: str = "Useful for search-based queries. Use this to find current information about markets, technologies, and companies."

    def _run(self, query: str) -> str:
        search = GoogleSerperAPIWrapper(serper_api_key=os.getenv("SERPER_API_KEY"))
        return search.run(query)

# Initialize the tool
mas_search_tool = SearchTool()

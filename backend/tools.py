from langchain_community.tools import DuckDuckGoSearchRun
from langchain.tools import tool

class SearchTools:
    @tool("Search the internet")
    def search_internet(query):
        """Useful to search the internet about a a given topic and return relevant results"""
        search = DuckDuckGoSearchRun()
        return search.run(query)

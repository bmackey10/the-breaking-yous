# https://docs.python.org/3/library/json.html
# This library will be used to parse the JSON data returned by the API.
import json
# https://docs.python.org/3/library/urllib.request.html#module-urllib.request
# This library will be used to fetch the API.
import urllib.request
import pprint
from datetime import datetime

'''
	This parameter allows you to change the category for the request. The available categories are : general, world, nation, business, technology, entertainment, sports, science and health.
'''
def get_top_stories(section):
    c = str(datetime.now())

    apikey = "1a423a884dedb79033115b4020ca8285"
    url = f"https://gnews.io/api/v4/top-headlines?category={section}&lang=en&country=us&max=10&apikey={apikey}"

    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode("utf-8"))
        articles = data["articles"]
        pprint.pprint(articles)
        
        filtered_data = []
        for article in articles:
                        source = article.get('source')
                        if source:
                                author = source['name']

                        filtered_article = {
                                'author': author,
                                'title': article.get('title', ''),
                                'section': 'business',
                                'description': article.get('description', ''),
                                'imageLink': article.get('image', ''),
                                'date': article.get('publishedAt', ''),
                                'url': article.get('url',''),
                                'scrapedTime': c,
                                'api': 'gnews'
                        }
                        filtered_data.append(filtered_article)
    return filtered_data


'''
# Example usage
section = "science"  # Replace with the desired section
filtered_data = get_top_stories(section)
if filtered_data:
    pprint.pprint(filtered_data)
'''
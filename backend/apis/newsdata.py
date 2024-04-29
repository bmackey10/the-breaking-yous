import requests
import pprint 
from datetime import datetime

'''
business, crime, domestic, education, entertainment, environment, food, health, lifestyle, other, politics, science, sports, technology, top, tourism, world
'''

def get_top_stories(section):
    c = str(datetime.now())

    url = f"https://newsdata.io/api/1/news?apikey=pub_41680e9778076e4b550db548d08642d8645dc&language=en&category={section}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        filtered_data = []
        for article in data.get('results', []):
            author = ''
            creators = article.get('creator')
            if creators:
                for creator in creators:
                    if creator:
                        author = creator
                        break
            filtered_article = {
                'author': author,
                'title': article.get('title', ''),
                'section': section,
                'description': article.get('description', ''),
                'imageLink': article.get('image_url', ''),
                'date': article.get('pubDate', ''),
                'url': article.get('source_url',''),
                'scrapedTime': c,
                'api': 'newsdata'

            }
            filtered_data.append(filtered_article)
        return filtered_data
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return None

'''
# Example usage
section = "science"  # Replace with the desired section
filtered_data = get_top_stories(section)
if filtered_data:
    pprint.pprint(filtered_data)
'''


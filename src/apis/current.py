import requests
import pprint
from datetime import datetime

'''
Permitted Topics
regional, technology, lifestyle, business, general, programming, science, entertainment, world, sports, finance, academia, politics, health, opinion, food, game
'''

def get_top_stories(section):
       url = ('https://api.currentsapi.services/v1/latest-news?' +
              'category='+ section + '&' +  'apiKey=kbGQd9onukGz1j0GLj4Ya4F6vLRNJIZnNXuxi01DDqtVUBPR')
       response = requests.get(url)
       #pprint.pprint(response.json())    
       c = str(datetime.now())

       if response.status_code == 200:
              data = response.json()
              filtered_data = []
              for article in data.get('news',[]):
                     filtered_article = {
                            'author': article.get('author', ''),
                            'title': article.get('title', ''),
                            'section': section,
                            'description': article.get('description', ''),
                            'imageLink': article.get('image', ''),
                            'date': article.get('published_date', ''),
                            'url': article.get('url',''),
                            'scrapedTime': c,
                            'api': 'currents'
                     }
                     filtered_data.append(filtered_article)
              return filtered_data
       else:
              print(f"Failed to fetch data. Status code: {response.status_code}")
              return None     
       

section = "business"
filtered_data = get_top_stories(section)
if filtered_data:
       pprint.pprint(filtered_data)
import requests
import pprint
from datetime import datetime


'''
Permitted Topics
arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world
'''

def get_top_stories(section):
    api_key = "BVXzFstMoiUxvKjeZfq9u8AlibRMygGd"  
    url = f"https://api.nytimes.com/svc/topstories/v2/{section}.json"
    params = {'api-key': api_key}


    response = requests.get(url, params=params)
    
    c = str(datetime.now())

    if response.status_code == 200:
        data = response.json()
        filtered_data = []
        for article in data.get('results', []):
            main_image_url = ''
            multimedia = article.get('multimedia')
            if multimedia:
                for media in multimedia:
                    if media.get('type') == 'image':
                        print("FOUND MEDIA")
                        main_image_url = media.get('url')
                        break
            filtered_article = {
                'author': article.get('byline', ''),
                'title': article.get('title', ''),
                'section': article.get('section', ''),
                'description': article.get('abstract', ''),
                'imageLink': main_image_url,
                'date': article.get('published_date', ''),
                'url': article.get('url',''),
                'scrapedTime': c,
                'api': 'nytimes'

            }
            filtered_data.append(filtered_article)
        return filtered_data
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return None

# Example usage
'''
section = "science"  # Replace with the desired section
filtered_data = get_top_stories(section)
if filtered_data:
    pprint.pprint(filtered_data)
'''


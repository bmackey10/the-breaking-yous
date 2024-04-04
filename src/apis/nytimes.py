import requests
import pprint

'''
Permitted Topics
arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world
'''

def get_top_stories(section):
    api_key = "BVXzFstMoiUxvKjeZfq9u8AlibRMygGd"  
    url = f"https://api.nytimes.com/svc/topstories/v2/{section}.json"
    params = {'api-key': api_key}
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return None

# Example usage
section = "science"  # Replace with the desired section
data = get_top_stories(section)
if data:
    pprint.pprint(data)

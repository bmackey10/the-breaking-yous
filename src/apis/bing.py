import requests
import pprint

'''
Possible Categories
Business, Entertainment (Entertainment_MovieAndTV, Entertainment_Music), Health, Politics
Products, ScienceAndTechnology, Technology, Science, Sports (Sports_Golf, Sports_MLB, Sports_NBA, Sports_NFL, Sports_NHL,Sports_Soccer, Sports_Tennis, Sports_CFB, Sports_CBB)
US (US_Northeast, US_South, US_Midwest, US_West)
World (World_Africa, World_Americas, World_Asia, World_Europe, World_MiddleEast)
'''

url = "https://bing-news-search1.p.rapidapi.com/news"

querystring = {"category":"Entertainment","safeSearch":"Off","textFormat":"Raw"}

headers = {
	"X-BingApis-SDK": "true",
	"X-RapidAPI-Key": "f2378cd9c9msh574b6bb8b2e4422p1a3302jsnf53145eca535",
	"X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

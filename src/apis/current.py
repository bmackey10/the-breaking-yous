import requests
import pprint

'''
regional
technology
lifestyle
business
general
programming
science
entertainment
world
sports
finance
academia
politics
health
opinion
food
game
'''

url = ('https://api.currentsapi.services/v1/latest-news?' +
       'category=technology&' +  'apiKey=kbGQd9onukGz1j0GLj4Ya4F6vLRNJIZnNXuxi01DDqtVUBPR')
response = requests.get(url)
pprint.pprint(response.json())                
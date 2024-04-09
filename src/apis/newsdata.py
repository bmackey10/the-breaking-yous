import requests
import pprint 

'''
business
crime 
domestic
education
entertainment
environment
food
health
lifestyle
other
politics
science
sports
technology
top
tourism
world
'''

url = 'https://newsdata.io/api/1/news?apikey=pub_41680e9778076e4b550db548d08642d8645dc&category=technology'
response = requests.get(url)
pprint.pprint(response.json())   
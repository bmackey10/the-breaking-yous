#!/usr/bin/env python3

import cx_Oracle
from datetime import datetime

import requests
import pprint

# import sys
# sys.path.append('../apicalls')

# from nytimes import get_top_stories as get_nytimes
# from gnews import get_top_stories as get_gnews
# from newsdata import get_top_stories as get_newsdata
# from current import get_top_stories as get_current
# from mergeApis import merge_apis as merge_apis
def get_newsdata(section):
    c = str(datetime.now())
    thesection = section
    if section == 'tourism':
        thesection = 'travel'
    if section == 'domestic':
        thesection = 'us'
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
                'section': thesection,
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
    
def get_current(section):
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
       
def get_nytimes(section):
    api_key = "BVXzFstMoiUxvKjeZfq9u8AlibRMygGd"  
    url = f"https://api.nytimes.com/svc/topstories/v2/{section}.json"
    params = {'api-key': api_key}


    response = requests.get(url, params=params)
    
    c = str(datetime.now())
    thesection = section
    if section == 'movies':
        thesection = 'entertainment'

    if response.status_code == 200:
        data = response.json()
        pprint.pprint(data)
        filtered_data = []
        for article in data.get('results', []):
            main_image_url = ''
            '''
            multimedia = article.get('multimedia')
            if multimedia:
                for media in multimedia:
                    if media.get('format') == 'Normal':
                        main_image_url = media.get('url')
                        break
            '''
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
            'section': thesection,
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

def merge_apis(section):

    if section == 'arts':
        nytimes = get_nytimes(section)
        #gnews = None
        newsdata = None
        current = None
    elif section == 'business' or section == 'health' or section == 'technology' or section == 'world' or section == 'sports':
        nytimes = get_nytimes(section)
        #gnews = get_gnews(section)
        newsdata = get_newsdata(section)
        current = get_current(section)
    elif section == 'food':
        nytimes = get_nytimes(section)
        newsdata = get_newsdata(section)
        current = get_current(section)
        #gnews = None
    elif section == 'lifestyle':
        newsdata = get_newsdata(section)
        current = get_current(section)
        nytimes = None
        #gnews = None
    elif section == 'politics':
        nytimes = get_nytimes(section)
        newsdata = get_newsdata(section)
        current = get_current(section)
        #gnews = None
    elif section == 'travel' or section == 'tourism':
        nytimes = get_nytimes(section)
        newsdata = get_newsdata(section)
        #gnews = None
        current = None
    elif section == 'us':
        nytimes = get_nytimes(section)
        #gnews = get_gnews('nation')
        newsdata = get_newsdata('domestic')
        current = None
    elif section == 'entertainment':
        nytimes = get_nytimes('movies')
        #gnews = get_gnews(section)
        newsdata = get_newsdata(section)
        current = get_current(section)

    # Merging the JSON results
    merged_data = []

    if nytimes and nytimes is not None:
        merged_data.extend(nytimes)
    '''
    if gnews and gnews is not None:
        merged_data.extend(gnews)
    '''
    if newsdata and newsdata is not None:
        merged_data.extend(newsdata)
    if current and current is not None:
        merged_data.extend(current)

    return merged_data

       

def add_topic_to_database(topic):
    # Connect to the database
    connection = cx_Oracle.connect('guest/guest@localhost:1521/XE')
    #connection = cx_Oracle.connect(user="guest", password="guest", dns="localhost/XE")

    # Create a cursor
    cursor = connection.cursor()

    # Merge data from different sources
    merged_data = merge_apis(topic)

    # Define SQL statement for inserting data
    sql_insert = "INSERT INTO articles (title, author, publish_date, retrieved_date, news_source, api_source, url, image_url, description, topic) VALUES (:title, :author, TO_DATE(:publish_date, 'YYYY-MM-DD HH24:MI:SS'), TO_DATE(:retrieved_date, 'YYYY-MM-DD HH24:MI:SS'), :news_source, :api_source, :url, :image_url, :description, :topic)"

    # Insert merged data into database
    for news_item in merged_data:
        title = news_item.get('title')
        author = news_item.get('author')
        publish_date = news_item.get('publishedAt')
        retrieved_date = news_item.get('scrapedTime')
        news_source = news_item.get('api')
        api_source = news_item.get('api')
        url = news_item.get('url')
        image_url = news_item.get('imageLink')
        description = news_item.get('description')
        if description and len(description) > 500:
            description = description[:500]
        topic = news_item.get('section')
        
        # Convert retrieved_date string to datetime object
        if retrieved_date is not None:
            retrieved_date = datetime.strptime(retrieved_date, '%Y-%m-%d %H:%M:%S.%f')
            # Format retrieved_date as string
            retrieved_date_str = retrieved_date.strftime('%Y-%m-%d %H:%M:%S')
        else:
            retrieved_date_str = None
        

        # Convert publish_date and retrieved_date to strings in the desired format
        publish_date_str = publish_date.strftime('%Y-%m-%d %H:%M:%S') if publish_date else None
        retrieved_date_str = retrieved_date.strftime('%Y-%m-%d %H:%M:%S') if retrieved_date else None

        
        print(title)
        print(author)
        print(publish_date_str)
        print(retrieved_date_str)
        print(news_source)
        print(api_source)
        print(url)
        print(image_url)
        print(description)
        print(topic)

        # Execute insert statement
        #cursor.execute(sql_insert, {'title': title, 'author': author, 'publish_date': publish_date_str, 'retrieved_date': retrieved_date_str, 'news_source': news_source, 'api_source': api_source, 'url': url, 'image_url': image_url, 'description': description, 'topic': topic})
        try:
            cursor.execute(sql_insert, {'title': title, 'author': author, 'publish_date': publish_date_str, 'retrieved_date': retrieved_date_str, 'news_source': news_source, 'api_source': api_source, 'url': url, 'image_url': image_url, 'description': description, 'topic': topic})
        except cx_Oracle.DatabaseError as e:
            print("Error inserting data:", e)
            continue  # Skip this iteration and continue with the next news item

    # Commit changes and close connection
    connection.commit()
    cursor.close()
    connection.close()
from nytimes import get_top_stories as get_nytimes
from gnews import get_top_stories as get_gnews
from newsdata import get_top_stories as get_newsdata
from current import get_top_stories as get_current
import pprint

def merge_apis(section):
    nytimes = get_nytimes(section)
    gnews = get_gnews(section)
    newsdata = get_newsdata(section)
    current = get_current(section)

    # Merging the JSON results
    merged_data = []

    if nytimes:
        merged_data.extend(nytimes)
    if gnews:
        merged_data.extend(gnews)
    if newsdata:
        merged_data.extend(newsdata)
    if current:
        merged_data.extend(current)

    return merged_data

merged_data = merge_apis("technology")
pprint.pprint(merged_data)
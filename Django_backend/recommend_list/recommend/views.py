from django.shortcuts import render
from django.http import HttpResponse
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import numpy as np
from sklearn.feature_selection import SelectKBest, chi2, SelectPercentile
import os
import json
from django.views.decorators.csrf import csrf_exempt
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer


words = stopwords.words("english")
nltk.download('punkt')
nltk.download('stopwords')
stopwords_set = set(stopwords.words("english"))

dir_path = os.path.dirname(os.path.realpath(__file__))
df = pd.read_csv(dir_path + '/listings_detail.csv', keep_default_na=False, skip_blank_lines=False, engine='python')
df['cleaned_amenities'] = df['amenities'].apply(lambda x: ' '.join([word for word in x.split() if word not in (stopwords_set)]))
df['cleaned_amenities'] = df['cleaned_amenities'].str.replace(r"[\{\},]", ' ')
df['cleaned_amenities'] = df['cleaned_amenities'].str.replace(r"[\"\',]", ' ')
df_NLP_recommender = df[['listing_url','name', 'summary', 'space', 'neighborhood_overview', 'notes', 'transit', 'access', 'cleaned_amenities']]
df_NLP_recommender['summary'] = df_NLP_recommender['summary'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['name'] = df_NLP_recommender['name'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['space'] = df_NLP_recommender['space'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['name'] = df_NLP_recommender['name'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['neighborhood_overview'] = df_NLP_recommender['neighborhood_overview'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['notes'] = df_NLP_recommender['notes'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['transit'] = df_NLP_recommender['transit'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['access'] = df_NLP_recommender['access'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))
df_NLP_recommender['cleaned_amenities'] = df_NLP_recommender['cleaned_amenities'].map(lambda x: re.sub('[^a-zA-Z1-9!?.]', ' ', x))

df_NLP_recommender['summary'].str.lower()
df_NLP_recommender['name'].str.lower()
df_NLP_recommender['space'].str.lower()
df_NLP_recommender['neighborhood_overview'].str.lower()
df_NLP_recommender['notes'].str.lower()
df_NLP_recommender['transit'].str.lower()
df_NLP_recommender['access'].str.lower()
df_NLP_recommender['cleaned_amenities'].str.lower()

print(df_NLP_recommender['summary'][0])
df_NLP_recommender.set_index('listing_url', inplace = True)
df_NLP_recommender['combined_columns'] = ''
columns = df_NLP_recommender.columns
for index, row in df_NLP_recommender.iterrows():
    words = ''
    for col in columns:

            words = words + row[col]+ ' '
    row['combined_columns'] = words
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_selection import SelectPercentile
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

vectorizer = TfidfVectorizer(sublinear_tf=True, min_df=6, stop_words='english')
recommender_matrix = vectorizer.fit_transform(df_NLP_recommender['combined_columns'])
index = pd.Series(df_NLP_recommender.index)
from sklearn.decomposition import TruncatedSVD
svd = TruncatedSVD(n_components=1400, n_iter=7, random_state=42)
recommender_matrix = svd.fit_transform(recommender_matrix)

cosine_sim = cosine_similarity(recommender_matrix, recommender_matrix)
def predict_NLP(link, cosine_sim = cosine_sim):

    recommended_listings = []
    num = index[index == link].index[0]
    score = pd.Series(cosine_sim[num]).sort_values(ascending = False)
    top = list(score.iloc[1:11].index)
    for i in top:
        recommended_listings.append(list(df_NLP_recommender.index)[i])

    return recommended_listings





print(dir_path)
print("ready")

# Create your views here.
def home(request):
    return HttpResponse('Recommender System Main Page')

@csrf_exempt
def listingDetails(request):
    listing_url = request.POST['url']
    result = predict_NLP(str(listing_url))
    first_choice = df.loc[df['listing_url'] == result[0]]
    first_id = first_choice['id'].tolist()[0]
    first_url = first_choice['listing_url'].tolist()[0]
    first_picture = first_choice['picture_url'].tolist()[0]
    response_data1 = {}
    response_data1['listing_id'] = first_id
    response_data1['listing_url'] = first_url
    response_data1['picture_url'] = first_picture

    second_choice = df.loc[df['listing_url'] == result[1]]
    second_id = second_choice['id'].tolist()[0]
    second_url = second_choice['listing_url'].tolist()[0]
    second_picture = second_choice['picture_url'].tolist()[0]
    response_data2 = {}
    response_data2['listing_id'] = second_id
    response_data2['listing_url'] = second_url
    response_data2['picture_url'] = second_picture

    third_choice = df.loc[df['listing_url'] == result[2]]
    third_id = third_choice['id'].tolist()[0]
    third_url = third_choice['listing_url'].tolist()[0]
    third_picture = third_choice['picture_url'].tolist()[0]
    response_data3 = {}
    response_data3['listing_id'] = third_id
    response_data3['listing_url'] = third_url
    response_data3['picture_url'] = third_picture

    fourth_choice = df.loc[df['listing_url'] == result[3]]
    fourth_id = fourth_choice['id'].tolist()[0]
    fourth_url = fourth_choice['listing_url'].tolist()[0]
    fourth_picture = fourth_choice['picture_url'].tolist()[0]
    response_data4 = {}
    response_data4['listing_id'] = fourth_id
    response_data4['listing_url'] = fourth_url
    response_data4['picture_url'] = fourth_picture

    fifth_choice = df.loc[df['listing_url'] == result[4]]
    fifth_id = fifth_choice['id'].tolist()[0]
    fifth_url = fifth_choice['listing_url'].tolist()[0]
    fifth_picture = fifth_choice['picture_url'].tolist()[0]
    response_data5 = {}
    response_data5['listing_id'] = fifth_id
    response_data5['listing_url'] = fifth_url
    response_data5['picture_url'] = fifth_picture

    final_data = [response_data1, response_data2, response_data3, response_data4, response_data5]


    return HttpResponse(json.dumps(final_data), content_type="application/json")
    #return JsonResponse(response_data)

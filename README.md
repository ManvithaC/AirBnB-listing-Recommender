# CMPE256 
## Regional and Behavioral Analysis of Airbnb Data
### Project Team - Avengers
* Akash Gupta
* Bruce Decker
* Manvitha Challagundla

### Description
In this project, we are using Airbnb open NYC data. It consists of information about the listings and reviews details. Below is the list of objectives that we are trying to achieve during the entire duration of the project.
* Perform natural language processing in various fields like descriptions, summaries, property type, room type etc and predict the review scores. 
* Predict listing prices of properties based on features like location, property type, room type, security deposits etc.
* Build a recommender system and provide a good user experience to the user. This system helps in recommending the listings based on the user’s previously visited property.
* Draw certain insights from the dataset - Where to invest in property in NYC to gain maximum profits from Airbnb? What causes the differences in the prices of property listings.
* Build a web-based platform where the user can provide a listing URL and the system will predict a list of five property listings for the user that is a close match.

### Instructions to run the code
* Python should be installed on your operating system .
* Install all the required packages: sklearn, pandas, numpy, matplotlib, scipy, wordcloud, nltk.
* Download the english stopwords from nltk.
* Download the dataset from https://www.kaggle.com/peterzhou/airbnb-open-data-in-nyc/version/1#listings_detail.csv.
* Run the code using jupyter Notebook or any other interactive python command shell.

Run the web application locally
FrontEnd:
* Make sure you have node installed on your system 
* cd to the FrontEndCode folder and run "npm install" command to install all the dependancies
* To start the application, run "npm start"

BackEnd:
* Make sure you have Django installed on your system 
* Install all the dependencies
* add listing_details.csv in Django_backend/recommend_list/recommend
* cd to the Django_backend/recommend_list/ folder and run "python manage.py runserver"

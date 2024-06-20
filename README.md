# Movie Recommender System
Welcome to the Movie Recommender System! This project is designed to help users find and explore movies tailored to their taste. The system leverages a dataset of over 5000 movies, providing personalized recommendations based on user input.

## Table of Contents

### Introduction
### Features
### Data Analysis
### Setup
### Usage




## Introduction
The Movie Recommender System is a web application that allows users to search for movies, get recommendations, add movies to a playlist, like movies, and leave comments. The recommendations are based on the similarity between movies, calculated using data analysis techniques.

## Features

* Search for Movies: Users can search for movies by entering a keyword in the search bar. The system provides instant suggestions based on the input.
* Recommendations: Upon selecting a movie, users can get a list of recommended movies that are similar to the selected one.
* Playlist Management: Users can add movies to their playlist for easy access.
* Like Movies: Users can like movies to show their preference.
* Comments: Users can leave comments on movies, providing a space for discussion and reviews.

## Data Analysis
The recommendation system is built on a dataset of over 5000 movies. Here’s a brief overview of the data analysis process:

### Data Collection: The dataset includes detailed information about each movie, such as title, genre, director, cast, and more.
### Data Cleaning: The dataset was cleaned to remove any inconsistencies, missing values, and duplicates.
### Feature Extraction: Relevant features were extracted from the dataset to build the recommendation model. These features include movie titles, genres, and other metadata.
### Similarity Calculation: The similarity between movies was calculated using cosine similarity based on the features. This allows the system to recommend movies that are similar to the one selected by the user.

## Setup
To run the Movie Recommender System locally, follow these steps:

### Clone the Repository:
* git clone https://github.com/Anurag24s/Movie-Recommender.git
* cd Movie-Recommender
* Open the Project:
* Open the project directory in your preferred code editor.

## Usage
Once you have the project set up, you can use the application as follows:

### Search for Movies:

* Enter a movie title or keyword in the search bar.
* The system will display suggestions as you type.

### Get Recommendations:

* Select a movie from the suggestions.
* Click the "Recommend" button to get a list of recommended movies.

### Manage Playlist:

* Click the "Add to Playlist" button to add the selected movie to your playlist.
* The playlist is displayed in the "Your Playlist" section.

### Like Movies:

* Click the "Like" button to like the selected movie.
* Liked movies are displayed in the "Liked Movies" section.

### Leave Comments:

* Enter a comment in the textarea and click the "Submit Comment" button.
* Comments are displayed in the "Comments" section for the selected movie.

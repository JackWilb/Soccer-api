# Soccer Player API and Web App
### By Jack Wilburn

## 1. General Information

This project contains a python flask backend and a javascript/html/css frontend. The front end mostly relies on angular with some help from d3 for the graphing element. 

## 2. Setup

To set up this project there are a couple steps:

* Clone the repo with `git clone https://github.com/JackWilb/Soccer-api.git`.
* Make sure you have python3 installed. 
* Make sure you have node and angular8 installed on your machine.
* Navigate into the backend folder
* Optionally intialize a virtualenv with python3 with `virtualenv -p python3 soccerapi` and then run `source soccerapi/bin/activate`. 
* Install the package requirements by running `pip install -r requirement.txt`.
* Run `python app.py` to start the flask server.
* Navigate to the frontend folder.
* run `npm install`.
* Run `ng build` and then `ng serve`.
* Go to your browser and open up both: 127.0.0.1:5000/players/ and 127.0.0.1:4200.

## 3. If it doesn't run

If it's not running on your machine withmy instructions you can also access the server with my ip address (shared seperately).

## 4. API Demonstration

The api has 5 different endpoints that serve data. Here are the links that will generate json for the 4 that don't accept input:

* 127.0.0.1:5000/players/
* 127.0.0.1:5000/countries/
* 127.0.0.1:5000/clubs/
* 127.0.0.1:5000/attributes/

Here is the one endpoint that changes (note that the capitalization is important and the names shouldn't have spaces):

* 127.0.0.1:5000/players/CristianoRonaldo
* 127.0.0.1:5000/players/Neymar


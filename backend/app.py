'''
@Author = Jack Wilburn

This python file runs the api and web app that will give information on 
prominent soccer players and will visualize their abilities vs the other players.
'''

## Import libraries and open the data

from flask import Flask, jsonify, render_template
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('soccer_small.json') as json_data:
    data = json.load(json_data)

## Routes for GET requests

@app.route('/players/<path:text>')
def player(text):
    # Find the entire dictionary that matches the player we're looking for
    result = [p for p in data if p['Name'].replace(" ", "") == text]
    return jsonify(result)

@app.route('/players/')
def players():
    # Return the whole dataset
    return jsonify(data)

@app.route('/countries/')
def countries():
    # Find all countries
    country_values = list(set([x['Nationality'] for x in data]))
    # Find all players for each country and combine into a json object with the zip function
    countries_players = dict(zip(country_values, [[p for p in data if p['Nationality'] == country] for country in country_values]))
    return jsonify(countries_players)

@app.route('/clubs/')
def clubs():
    # Find all clubs
    club_values = list(set([x['Club'] for x in data]))
    # find all players for each clube and combine into a json object with the zip function
    clubs_players = dict(zip(club_values, [[p for p in data if p['Club'] == club] for club in club_values]))
    return jsonify(clubs_players)

@app.route('/attributes/')
def attributes():
    # Find all unique keys
    all_keys = list(set().union(*(d.keys() for d in data)))
    return jsonify(all_keys)

@app.route('/app/')
def web_app():
    # Pass through the template that can handle all of the scripts, css, and html/
    return render_template('app.html')

## Required main method to run the above code
if __name__ == '__main__':
    app.run(host=0.0.0.0)
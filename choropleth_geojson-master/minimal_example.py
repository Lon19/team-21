import choropleth_geojson as cg
import pandas as pd
import json
import plotly.offline as offline

apikey = 'pk.eyJ1IjoiamFrZTQ3NjEiLCJhIjoiY2syZ3F5NzZxMGZ2YTNobnRzaTBvNWFwOCJ9.Ul2E9BycZxI6UNuRHRTADg'

df = pd.read_csv('population_data.csv', index_col = 0)

with open(r'north_america.json') as f:
    geojson = json.load(f)

northamerica = cg.choropleth(apikey, df, geojson, 'Country')
fig = northamerica.choroplot()

offline.plot(fig, auto_open=True)


import choropleth_geojson as cg
import pandas as pd
import json
import plotly.offline as offline

apikey = 'pk.eyJ1IjoiamFrZTQ3NjEiLCJhIjoiY2syZ3F5NzZxMGZ2YTNobnRzaTBvNWFwOCJ9.Ul2E9BycZxI6UNuRHRTADg'

df = pd.read_csv('final.csv', index_col = 0)

with open(r'Wards.json') as f:
    geojson = json.load(f)

lat = 1.3521
lon = 103.8198
cmap = 'viridis'
zoom = 9.8
opacity = 0.7
ptitle ='Wards Data Test'
ctitle = 'Unemployment Statistics'

sg = cg.choropleth(apikey, df, geojson, 'name')
fig = sg.choroplot(cmap, ptitle, ctitle, lat, lon, zoom, opacity)

savefile = 'test.html'
offline.plot(fig, filename = savefile, auto_open=True)

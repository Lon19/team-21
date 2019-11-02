import choropleth_geojson as cg
import pandas as pd
import json
import plotly.offline as offline

apikey = 'pk.eyJ1IjoiamFrZTQ3NjEiLCJhIjoiY2syZ3F5NzZxMGZ2YTNobnRzaTBvNWFwOCJ9.Ul2E9BycZxI6UNuRHRTADg'

df = pd.read_csv('try.csv', index_col = 0)

with open(r'try.json') as f:
    geojson = json.load(f)

lat = 0.086889889015885
lon = 51.537506269075045
cmap = 'viridis'
zoom = 9.8
opacity = 0.7
ptitle ='Singapore population danksity by planning area'
ctitle = 'Population per square kilometer'

sg = cg.choropleth(apikey, df, geojson, 'WD13NM')
fig = sg.choroplot(cmap, ptitle, ctitle, lat, lon, zoom, opacity)

savefile = 'Jake.html'
offline.plot(fig, filename = savefile, auto_open=True)

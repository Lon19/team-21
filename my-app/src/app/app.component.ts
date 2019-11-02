import { Component, OnInit } from '@angular/core';
import data from '../assets/final.json';

declare let L;
let mapboxAccessToken = "";
let statesData = data;
let geojson;
let info = L.control();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
    const map = L.map('map').setView([53.4808,2.2426], 8);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
      attribution: '&copy; <a href=”http://osm.org/copyright”>OpenStreetMap</a> contributors'
    }).addTo(map);
    function getColor(d) {
      return d > 50 ? '#800026' :
        d > 30 ? '#BD0026' :
          d > 20 ? '#E31A1C' :
            d > 10 ? '#FC4E2A' :
              d > 5 ? '#FD8D3C' :
                d > 3 ? '#FEB24C' :
                  d > 0 ? '#FED976' :
                    '#FFEDA0';
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.dataComb),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
        
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }  

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }

      geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML = '<h4>Unemployment</h4>' +  (props ?
          '<b>' + props.WD13NM + '</b><br />' + props.dataComb + ' people'
          : 'Hover over a state');
      };

      info.addTo(map);

    }

  
}

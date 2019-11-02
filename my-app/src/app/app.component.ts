import { Component, OnInit } from '@angular/core';
import data from '../assets/wards.json';

declare let L;
let mapboxAccessToken = "";
let statesData = data;
let geojson;
let info = L.control();
// const cityData = require(data);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  // title = 'my-app';
  constructor() {

  }

  ngOnInit() {
    const map = L.map('map').setView([50, 0], 6);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     }).addTo(map);

    // var newMap = L.map('map').setView([38.9188702, -77.0708398], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
      attribution: '&copy; <a href=”http://osm.org/copyright”>OpenStreetMap</a> contributors'
    }).addTo(map);
    function getColor(d) {
      return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
          d > 200 ? '#E31A1C' :
            d > 100 ? '#FC4E2A' :
              d > 50 ? '#FD8D3C' :
                d > 20 ? '#FEB24C' :
                  d > 10 ? '#FED976' :
                    '#FFEDA0';
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }


    // L.geoJson(statesData).addTo(map);
    L.geoJson(statesData, { style: style }).addTo(map);

    // L.getJSON("try.json",function(data){
    //   // add GeoJSON layer to the map once the file is loaded
    //   var datalayer = L.geoJson(data ,{
    //   onEachFeature: function(feature, featureLayer) {
    //   featureLayer.bindPopup(feature.properties.NAME_1);
    //   }
    //   }).addTo(map);
    //   map.fitBounds(datalayer.getBounds());
    //   });

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
    }  

      // geojson = L.geoJson();

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

      // let info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
          'people / mi<sup>2</sup>'
          : 'Hover over a state');
      };

      info.addTo(map);

    }

  
}

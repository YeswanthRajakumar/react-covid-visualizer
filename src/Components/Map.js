import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet'
import "./Map.css";
import {showDataOnMap} from './util'
function Map({center,zoom,countries,casesType}) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} countries={countries} >
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {casesType === 'cases' && showDataOnMap(countries,casesType)}
        {casesType === 'recovered' && showDataOnMap(countries,casesType='recovered')}
        {casesType === 'deaths' && showDataOnMap(countries,casesType='deaths')}
      
            </MapContainer>
        </div>
    )
}

export default Map

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import mapStyles from "./mapStyles";
import SearchForm from '../search/search'
 
 
function Map  () {
       console.log()
    
        return(
            <div className= "map-container">
            <div className= "right-container">
            <SearchForm/>
            </div>
            <div className= "left-container">
            <GoogleMap defaultZoom={13} defaultCenter={{lat:40.712776, lng:-74.005974}}
            defaultOptions={{ styles: mapStyles }} >
            </GoogleMap>
            </div>
            </div>
        )
    

}

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import mapStyles from "./mapStyles";
 
 
function Map  () {
       console.log()
    
        return(
            <GoogleMap defaultZoom={12} defaultCenter={{lat:40.712776, lng:-74.005974}}
            defaultOptions={{ styles: mapStyles }} >
            </GoogleMap>
        )
    

}

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
 
 
function Map  () {
       console.log()
    
        return(
            <GoogleMap defaultZoom={10} defaultCenter={{lat:40.712776, lng:-74.005974}}>

            </GoogleMap>
        )
    

}

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
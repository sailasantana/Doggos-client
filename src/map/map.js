import SearchForm from '../search/search'
import Sidebar from '../sidebar/sidebar'
import {Link} from 'react-router-dom'
import DoggoContext from '../context'
import React, { useState, useEffect, useContext } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyles";
 
 
class Map extends React.Component {
    //const context = useContext(DoggoContext)
    //const [selected, setSelected] = useState(null);
    static contextType = DoggoContext

    state = {
        selected : {}
        
    }


    render(){
        // console.log(this.context.locations.results[0].geometry.location.lat)
        // console.log(this.context)
        // console.log(this.state.selected.geometry)
  
    return (
        <div>
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat:40.712776, lng:-74.005974}}
            defaultOptions={{ styles: mapStyles }}
        >
            {this.context.locations.results.map((result , i)=> (
            <Marker
                key={result.i}
                position={{
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng
                }}
                onClick={() => {
                    this.setState({selected:result});
                  }}
                icon={{
                url: "https://img.icons8.com/cotton/64/000000/dog-jump--v1.png",
                scaledSize: new window.google.maps.Size(25, 25)
                }}
            /> 
            ))} 
        {this.state.selected !== null && (
        <InfoWindow
          onCloseClick={() => {
            this.setState({selected:null});
        }}
          position={{

            lat: 40.712776,
            lng: -74.005974
          }}
        >
          <div>
            <h2>{this.state.selected.name}</h2>
            <p>{this.state.selected.formatted_address}</p>
          </div>
        </InfoWindow>
      )}
        </GoogleMap>
        </div>
     );
    }
  }
  

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
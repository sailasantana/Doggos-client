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
import config from '../config';
import TokenService from '../client-services/token'
 
 
class Map extends React.Component {
    //const context = useContext(DoggoContext)
    //const [selected, setSelected] = useState(null);
    static contextType = DoggoContext

    state = {
        selected : {}
        
    }

    componentDidMount(){
      const token = TokenService.getAuthToken();
      const options = {
          method : 'GET',
          headers : {
              'session_token' : token
          }
      }

      fetch( `${config.API_ENDPOINT}/api/validate`, options )
          .then( response => {
              if( response.ok ){
                  return response.json();
              }

              throw new Error( response.statusText );
          })
          .then( responseJson => {
              this.setState({
                  message : responseJson.message
              })
          })
          .catch( err => {
              console.log( err.message );
              this.props.history.push( '/login' );
          });
  }



    render(){

      console.log(this.state.selected)
   
  
    return (
        <div>
          {this.context.locations ?
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat:this.context.locations.results[0].geometry.location.lat, lng:this.context.locations.results[0].geometry.location.lng}}
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
        {this.state.selected.geometry && (
        <InfoWindow
          onCloseClick={() => {
            this.setState({selected:null});
        }}
          position={{

            lat: this.state.selected.geometry.location.lat,
            lng: this.state.selected.geometry.location.lng
          }}
        >
          <div>
            <h2>{this.state.selected.name}</h2>
            <p>{this.state.selected.formatted_address}</p>
          </div>
        </InfoWindow>
      )}
        </GoogleMap>
        : null }
        </div>
     );
    }
  }
  

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
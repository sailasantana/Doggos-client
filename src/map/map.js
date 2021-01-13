import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import mapStyles from "./mapStyles";
import SearchForm from '../search/search'
import Sidebar from '../sidebar/sidebar'
import {Link} from 'react-router-dom'
 
 
class Map extends React.Component {

   constructor(props){
       super(props)

       this.state = {
           places : []
       }
   } 
    
      render(){
        return(
            <div>
            <Sidebar width={300} height={"100vh"}>
            <Link to ='./dashboard'>My Dashboard</Link>
            <br></br>
            <br></br>
            <Link to ='./add-review'>Review A Doggo Business</Link>
            <br></br>
            <br></br>
            <Link to ='./recommend'>Recommend A Business</Link>
            </Sidebar>   
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
            </div>
        )
      }
    

}

const MapWrapped  = withScriptjs(withGoogleMap(Map))
 
export default MapWrapped;
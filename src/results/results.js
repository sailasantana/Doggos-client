import React from 'react';
import { Link } from 'react-router-dom';
import Result from './result'
import MapWrapped from '../map/map'
import DoggoContext from '../context'


export default class Results extends React.Component {

    static contextType = DoggoContext;

   

    render(){
    
    const results = this.context.locations.results
        
     const searchResults = results.map( (places, i) => {

            return (
                <ul key = {this.context.locations.results[i].id}>
                    <li className = {this.context.locations.results[i].id}>
                     <Result 
                        title = {this.context.locations.results[i].name}
                        address = {this.context.locations.results[i].formatted_address}
                        operational = {this.context.locations.results[i].business_status}
                        overall_rating = {this.context.locations.results[i].rating}
                     
                        />
                    </li>
                </ul>)
            
                }


      )
      
      return (
        <div>    
           <div>{searchResults}</div>
           <div style={{ width: "75vw", height: "100vh" }} className = "map"> 
             
                <MapWrapped       
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAZ9e8yrmg_qJFoBB7Giz4ZKzQNPl7fDm4`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} /> }
                />
          
            </div>
        </div>  ) 
   
    }

}
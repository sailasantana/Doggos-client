import React from 'react';
import { Link } from 'react-router-dom';
import Result from './result';
import MapWrapped from '../map/map';
import DoggoContext from '../context';
import config from '../config';
import TokenService from '../client-services/token';
import './result.css';


export default class Results extends React.Component {

    static contextType = DoggoContext;

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
                alert('Please log back in to continue');
                this.props.history.push( '/' );
            });
    }


    render(){

    const results = this.context.locations.results
    
    let revised = () => {

        if(!results){
            return 'No Results Found - Please try a different zip'
        }       
        else {

         return results.filter((result,i) => {
          
           let zip = this.context.currentZip
           let zips = result.formatted_address
           return zips.slice(-20,-16) == zip.slice(0,-1)})
      
            }
        } 

    const filteredResults =  revised() 


    const searchResults = filteredResults.map( (place, i) => {

            return (
                <ul key = {i} >
                    <li className = "place">
                     <Result 
                        title = {place.name}
                        address = {place.formatted_address}
                        overall_rating = {place.rating}
                        place_id = {place.place_id}
                        id ={i}
                     
                        />
                    </li>
                </ul>)
            
                }


      )


             return(
                 <div >
                     {filteredResults.length > 0 ?
                     <div className = "results-container">
                     <div className = 'list-results'>{searchResults}</div>
                     <div className = "map-results"> 
                          <MapWrapped       
                          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.key}`}
                          loadingElement={<div style={{ height: "100%" }} />}
                          containerElement={<div style={{ height: "100%" }} />}
                          mapElement={<div style={{ height: "100%" }} /> }
                          />
                    
                      </div>
                      </div>
                      : <div className = "no-results-message">No results - Please try a different zip</div>
                     }
                     </div>
                
             )
   
    }

}
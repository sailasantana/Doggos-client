import React from 'react';
import { Link } from 'react-router-dom';
import Result from './result';
import MapWrapped from '../map/map';
import DoggoContext from '../context';
import LogOut from '../loginSignup/logout';
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
                console.log( err.message );
                this.props.history.push( '/login' );
            });
    }


    render(){

    const results = this.context.locations.results

    // console.log(results)
    // console.log(this.context.currentZip.slice(0,-1))
    // console.log(this.context.locations.results[0].formatted_address.split(',')[2].split(' ')[2].slice(0,-1) )

    
    let revised = () => {

        if(!results){
            return 'No Results Found - Please try a different zip'
        }       
        else {

         return results.filter((result,i) => {
          
           let zip = this.context.currentZip
           console.log(result.formatted_address)
           let zips = result.formatted_address
           return zips.slice(-20,-16) == zip.slice(0,-1)})
      
            }
        } 

    const filteredResults =  revised() 
    console.log('filter results',filteredResults)

     const searchResults = filteredResults.map( (place, i) => {

            return (
                <ul key = {place.id}>
                    <li className = "place">
                     <Result 
                        title = {place.name}
                        address = {place.formatted_address}
                        overall_rating = {place.rating}
                        place_id = {place.place_id}
                        id ={place.id}
                     
                        />
                    </li>
                </ul>)
            
                }


      )


             return(
                 <div>
                     {filteredResults.length > 0 ?
                     <div>
                     <div className = 'list-results'>{searchResults}</div>
                     <div style={{ width: "75vw", height: "100vh" }} className = "map-results"> 
                          <MapWrapped       
                          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.key}`}
                          loadingElement={<div style={{ height: "100%" }} />}
                          containerElement={<div style={{ height: "100%" }} />}
                          mapElement={<div style={{ height: "100%" }} /> }
                          />
                    
                      </div>
                      </div>
                      : 'No results - Please try a different zip'
                     }
                     </div>
                
             )
   
    }

}
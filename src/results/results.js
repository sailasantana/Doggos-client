import React from 'react'
import { Link } from 'react-router-dom'
import Result from './result'
import MapWrapped from '../map/map'
import DoggoContext from '../context'
import LogOut from '../loginSignup/logout'
import config from '../config'
import TokenService from '../client-services/token'


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
        
     const searchResults = results.map( (places, i) => {

            return (
                <ul key = {this.context.locations.results[i].id}>
                    <li className = {this.context.locations.results[i].id}>
                     <Result 
                        title = {this.context.locations.results[i].name}
                        address = {this.context.locations.results[i].formatted_address}
                        overall_rating = {this.context.locations.results[i].rating}
                        place_id = {this.context.locations.results[i].place_id}
                        id ={this.context.locations.results[i].id}
                     
                        />
                    </li>
                </ul>)
            
                }


      )


             return(
                 <div>
                     {this.context.locations.results.length > 0 ?
                     <div>
                     <div>{searchResults}</div>
                     <div style={{ width: "75vw", height: "100vh" }} className = "map"> 
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
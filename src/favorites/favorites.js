import React from 'react';
import { Link } from 'react-router-dom';
import favorite from './favorite';
import DoggoContext from '../context';
import Favorite from './favorite';
import Sidebar from '../sidebar/sidebar';
import LogOut from '../loginSignup/logout';
import config from '../config';
import './favorite.css';
import TokenService from '../client-services/token';



export default class Favorites extends React.Component {

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
    
   
        let spots = this.context.savedSpots.map((spot , i) => {
            return (
                <ul key = {this.context.savedSpots[i].id}>
                    
                <li className = "saved-spot">
                    <Favorite
                        title={this.context.savedSpots[i].title}
                        doggoaddress={this.context.savedSpots[i].doggoaddress}
                        id={this.context.savedSpots[i].id}
                      />  
                </li>
                
                </ul>

            )
        })
      return (
        <div> 
            {/* <Sidebar width={300} height={"100vh"}>
            <Link to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <Link to ='./recommend'>Recommend A Business</Link>
            </Sidebar>     */}
           <div className = "dashboard-container" >
           <h2 className = "dashboard-title">Places to Take Doggo</h2>
           <div className = "all-spots">{spots}</div>
           <img className = "dashboard-image" src = "https://i.pinimg.com/474x/06/fa/ba/06faba422b1e25a5ddcfb4fbab6f5bc8.jpg" height = "350" width = "400"/>
            </div> 
        </div>  ) 
   
    }

}
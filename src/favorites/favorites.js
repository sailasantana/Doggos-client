import React from 'react';
import { Link } from 'react-router-dom';
import DoggoContext from '../context';
import Favorite from './favorite';
import Sidebar from '../sidebar/sidebar';
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

    handleLogOut = () => {

        TokenService.clearAuthToken()
        console.log(this.props)
        this.props.history.push('/login')

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
        <div className = "dashboard-container1"> 
            <Sidebar className = "side-bar" width={300} height={"100vh"}>
            <br></br>    
            <Link className = "link1-button" to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <br></br>
            <Link className = "link2-button" to ='./recommend'>Recommend A Business</Link>
            <br></br>
            <button className="log-out-button" onClick = {this.handleLogOut}>Log out</button>
            </Sidebar>    
           <div className = "dashboard-container2" >
           <h2 className = "dashboard-title">Places to Take Doggo</h2>
           <div className = "all-spots">{spots}
           <Link className = "add-more-button" to = '/dashboard'>+</Link>
           </div>
            </div> 
        </div>  ) 
   
    }

}
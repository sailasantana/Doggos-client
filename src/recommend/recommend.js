import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar'
import LogOut from '../loginSignup/logout'
import config from '../config'
import TokenService from '../client-services/token';
import './recommend.css';




export default class Recommend extends React.Component {

    state = {
        submit: false 
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


    handleSubmit = (event) => {
        event.preventDefault();
        

        this.setState({submit : true});


    }


    handleLogOut = () => {

        TokenService.clearAuthToken()
        console.log(this.props)
        this.props.history.push('/login')

    }

    render(){

        return(
            <div className = "recommend-container1">
            <Sidebar className = "side-bar" width={300} height={"100vh"}>
            <br></br>
            <Link className = "link1-button" to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <br></br>
            <Link className = "link2-button" to ='./dashboard'>My Dashboard</Link>
            <br></br>
            <button className="log-out-button" onClick = {this.handleLogOut}>Log out</button>
            </Sidebar>
            <div className = "recommend-container2">
            <h1 className = "form-title">Recommend A DoggoSpot</h1>
            <h3 className = "form-title">Help DoggosWelcome grow its directory and make the world a more dog-friendly place</h3>
            <form className ='recommend-form-container' onSubmit = {this.handleSubmit} >        
                <label className= "recommend-label"  for="type">Name:</label>
                <input className = "fetch-input" type="text" id="name" name="name" placeholder="Paw Haven"  required/>                
                <label className= "recommend-label"  for="type">Type Of Business:</label>
                <select   className = "fetch-input " name="type" id="type">
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Parks">Park</option>
                <option value="Bars">Bar</option>
                <option value="Restaurants">Restaurant</option> 
                <option value="Veterinarian Services">Veterinarian Services</option>
                <option value="Dog Beaches">Dog Beach</option>
                <option value="Other">Other</option>
                </select>                 
                <label className= "recommend-label" for="address" >Address (Please include Street Address, City, State and Zip):</label>
                <textarea className = "fetch-input" type="text" id="address" name="address" placeholder="123 Fluffy Lane, Brooklyn, NY 11201" required />               
                <input type="submit" value="Recommend" className="recommend-button" />
                </form>
                <div> {this.state.submit ? <p className = "result-text">Your recommendation was successfully submitted. It will be reviewed by our Doggo Administrator. Thank you!</p> : null}</div>
                </div>
                </div>
        )
    }
}
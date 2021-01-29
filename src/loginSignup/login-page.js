import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './sign-up'
import AuthApiService from '../client-services/auth-api-service'
import TokenService from '../client-services/token'
import DoggoContext from '../context'
import config from '../config'
import './login-signup.css'

export default class LoginPage extends React.Component {

    static contextType = DoggoContext;

    static defaultProps = {
        onValidLogin: () => {}
    };

    constructor(props) {
        super(props);
        this.userInput = React.createRef();
        this.passInput = React.createRef();
        this.state = {error: null};
    };

    // handle login authentication and validation on submit. //
    handleJwtLoginAuth = e => {
        e.preventDefault();
       
     
        AuthApiService.postLogin({
            user_name: this.userInput.current.value,
            password: this.passInput.current.value 
        })
        .then(res => {
        
            this.context.setUserName(this.userInput.current.value)
            TokenService.saveAuthToken(res.token);
            this.props.onValidLogin(); 

            fetch(`${config.API_ENDPOINT}/api/${this.userInput.current.value}/dashboard`, {
                headers: {
                  'session_token':`${TokenService.getAuthToken()}`
                }
              })
              .then(res => {
                if(!res.ok){
                  return res.json().then(e => Promise.reject(e))
                }
                return res.json()
              })

              .then(spots => {
                this.context.setUserSpots(spots)
              })
              .catch(error => {
                alert({error})
              })

            })
                
           
        .then(() => {
            this.props.history.push('/search')})
            
        .catch(res => {
            this.setState({
            error: alert("Invalid username or password. Please re-enter your credentials.")
                });
            });
    
    }


    render() {

          return(
            <div className="section">
            
                    <h4 className="mb-4 pb-3">Log In</h4>
                    <form onSubmit={this.handleJwtLoginAuth}>
                      <input type="text" ref = {this.userInput}  name="user" id="user" className="form-style" placeholder="Your Username"  autocomplete="off"/>
                      <input type="password" ref = {this.passInput} name="password" id="password" className="form-style" placeholder="Your Password" i autocomplete="off"/>
                      <button className="btn mt-4">submit</button>
                    </form>
                    <Link to = '/sign-up'>New User? Sign up here</Link>
                                  
              
        </div>





        )
    }


}

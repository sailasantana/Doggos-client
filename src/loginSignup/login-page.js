import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './sign-up'
import AuthApiService from '../client-services/auth-api-service'
import TokenService from '../client-services/token'
import DoggoContext from '../context'
import config from '../config'

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
        //console.log(this.userInput.current.value)
        //console.log(this.passInput.current.value)
     
        AuthApiService.postLogin({
            user_name: this.userInput.current.value,
            password: this.passInput.current.value 
        })
        .then(res => {
        
        //you need a return here to trigger the next .then
            this.context.setUserName(this.userInput.current.value)
            console.log(res)
            TokenService.saveAuthToken(res.token);
            this.props.onValidLogin(); 



            console.log(`${config.API_ENDPOINT}/api/${this.userInput.current.value}/dashboard`)
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
                console.log(spots)
                this.context.setUserSpots(spots)
              })
              .catch(error => {
                alert({error})
              })

            })
                
           
        .then(() => {
            console.log(this.props.history)
            this.props.history.push('/search')})
            
        .catch(res => {
            this.setState({
            error: alert("Invalid username or password. Please re-enter your credentials.")
                });
            });
    
    }


    render() {

        return(
            <div>
                <h1>DoggosWelcome!</h1>
                <h2>Login or Sign Up to Continue</h2>
                <form onSubmit={this.handleJwtLoginAuth}>
                    <label>Username</label>
                    <input ref = {this.userInput} type = 'text' name= 'user' id= 'user'/>
                    <label>Password</label>
                    <input ref = {this.passInput} type = 'password' name= 'password' id= 'password'/>
                    <button type='submit' >
                    Login

                </button>
                <Link to ='./sign-up'>New to DoggosWelcome? Sign Up here!</Link>
                </form>
            </div>
        )
    }


}

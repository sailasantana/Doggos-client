import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './sign-up'
import AuthApiService from '../client-services/auth-api-service'
import TokenService from '../client-services/token'
import DoggoContext from '../context'
import config from '../config'
import './login.css'

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
            localStorage.setItem( 'user_name', this.userInput.current.value );       
            TokenService.saveAuthToken(res.token);
            this.props.onValidLogin(); 

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
            <div className="container">
                <div className="left">
                    <div className="header">
                    <h2 className="animation a1">DoggosWelcome</h2>
                    <h4 className="animation a2">Explore over thousands of dog-friendly places to stay, play, and eat with your dog! <br/><br/> Log in to get started</h4>
                    </div>
                    <form className="login-form" onSubmit={this.handleJwtLoginAuth}>
                    <input type="text" ref = {this.userInput}  name="user" id="user" className="form-field animation a3" placeholder="Username"/>
                    <input type="password" ref = {this.passInput} name="password" id="password" className="form-field animation a4" placeholder="Password"/>
                    <button className="animation a6">LOGIN</button>                   
                    <Link  className = "link-sign-up" to = '/sign-up'>New User? Sign up here</Link>
                    </form>
                </div>
                <div className="right"></div>
            </div>
                                  
              





        )
    }


}

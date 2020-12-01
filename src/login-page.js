import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './sign-up'
import AuthApiService from './client-services/auth-api-service'
import TokenService from './client-services/token'

export default class LoginPage extends React.Component {

    static defaultProps = {
        onValidLogin: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {error: null};
    };

    // handle login authentication and validation on submit. //
    handleJwtLoginAuth = e => {
        e.preventDefault();
        const {user_name, password} = e.target;

        this.setState({
            error: null
        });
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value 
        })
    .then(res => {
        //you need a return here to trigger the next .then
                user_name.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                this.props.onValidLogin(); })
           
    .then(() => {
        //you can history.push instead
            window.location='/dashboard';})
            
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
                    <input type = 'text' name= 'user_name' id= 'user_name'/>
                    <label>Password</label>
                    <input type = 'text' name= 'password' id= 'password'/>
                    <button type='submit' >
                    Login
                </button>
                <Link to ='./sign-up'>New to DoggosWelcome? Sign Up here!</Link>
                </form>
            </div>
        )
    }


}

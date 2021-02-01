import React from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../client-services/auth-api-service'
import './signup.css'



export default class SignUp extends React.Component {

    constructor(props){
        super(props)
        this.fNameInput = React.createRef()
        this.lNameInput = React.createRef()
        this.userInput = React.createRef()
        this.passInput = React.createRef()
    }

    handleNewUser = (e) => {
        e.preventDefault();

        const newUser = {
            first_name : this.fNameInput.current.value,
            last_name: this.lNameInput.current.value,
            user_name: this.userInput.current.value,
            password: this.passInput.current.value

        }

        AuthApiService.postUser(newUser)
        .then(user => {
            this.fNameInput.current.value = '';
            this.lNameInput.current.value = '';
            this.userInput.current.value = '';
            this.passInput.current.value = '';
        })
        .then(() => {
            this.props.history.push(`/`)
            window.alert('Registered successfully. Please log in with your new credentials.');
        })
        .catch(res => {
            this.setState({
                error: window.alert('An unexpected error occurred. Please try again later.')
            });
        })



    }

    render(){

        return(
            <div class="container">
                <div class="center">
                    <div class="header">
                    <h2 >What are you waiting for? Sign up already!</h2>
                    <img src = "https://thumbs.gfycat.com/GrossContentBluemorphobutterfly-size_restricted.gif"/>
                    </div>
                    <form className="signup-form" onSubmit = {this.handleNewUser}>
                    <input ref = {this.fNameInput} type = 'text' name= 'first_name' id='first_name' class="form-field" placeholder="First Name"/>
                    <input  ref ={this.lNameInput} type = 'text' name= 'last_name' id='last_name' class="form-field" placeholder="Last Name"/>
                    <input type="text" ref = {this.userInput}  name="user" id="user" class="form-field" placeholder="Username"/>
                    <input type="password" ref = {this.passInput} name="password" id="password" class="form-field" placeholder="Password"/>
                    <button >Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }


}
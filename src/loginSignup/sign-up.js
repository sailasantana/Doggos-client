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

        this.state = {error: null};
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
        .catch(err => {
            this.setState({
                error: err.error
                });
            });
      



    }

    render(){

        return(
            <div class="sign-up-container">
                <div class="center">
                    <div class="sign-up-header">
                    <h2>Sign up already!</h2>
                    <img src = "https://thumbs.gfycat.com/GrossContentBluemorphobutterfly-size_restricted.gif"/>
                    </div>
                    <form className="signup-form" onSubmit = {this.handleNewUser}>
                    <input ref = {this.fNameInput} type = 'text' name= 'first_name' id='first_name' class="form-field" placeholder="First Name" required/>
                    <input  ref ={this.lNameInput} type = 'text' name= 'last_name' id='last_name' class="form-field" placeholder="Last Name" required/>
                    <input type="text" ref = {this.userInput}  name="user" id="user" class="form-field" placeholder="Username" required/>
                    <input type="password" ref = {this.passInput} name="password" id="password" class="form-field" placeholder="Password" required/>
                    <button >Sign Up</button>
                    </form>
                    {this.state.error ?
                    <div>{this.state.error}</div> : null
                    }
                </div>
            </div>
        )
    }


}
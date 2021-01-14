import React from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../client-services/auth-api-service'



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
            <div>
                <form onSubmit = {this.handleNewUser}>
                    <h2>Sign Up</h2>
                    <label>First Name</label>
                    <input ref = {this.fNameInput} type = 'text' name= 'first_name'/>
                    <label>Last Name</label>
                    <input ref ={this.lNameInput} type = 'text' name= 'last_name'/>
                    <label>Username</label>
                    <input ref ={this.userInput} type = 'text' name= 'user_name'/>
                    <label>Password</label>
                    <input ref = {this.passInput} type = 'password' name= 'password'/>
                    <button>Sign Up</button>

                </form>
            </div>
        )
    }


}
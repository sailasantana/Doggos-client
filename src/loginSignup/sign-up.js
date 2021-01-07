import React from 'react'
import { Link } from 'react-router-dom'


export default class SignUp extends React.Component {

    render(){

        return(
            <div>
                <form >
                    <h2>Sign Up</h2>
                    <label>Username</label>
                    <input type = 'text' name= 'user-name'/>
                    <label>Password</label>
                    <input type = 'text' name= 'password'/>
                    <Link to ='./'>Sign Up</Link>

                </form>
            </div>
        )
    }


}
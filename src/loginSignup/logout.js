import React from 'react'
import TokenService from '../client-services/token'


export default class LogOut extends React.Component {


    handleLogOut = () => {

        TokenService.clearAuthToken()
        console.log(this.props)
        this.props.history.push('/login')

    }

    render(){
        return(
            <button onClick = {this.handleLogOut}>Log Out</button>
        )
    }

}
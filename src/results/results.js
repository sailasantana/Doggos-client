import React from 'react';
import { Link } from 'react-router-dom';


export default class Results extends React.Component {

    render(){

        return(
            <div>
            <div className = "result">
                <h2>Doggo Business 1</h2>
                <h3>Address 1</h3>
                <h3>Phone Number 1</h3>
                <Link to ='./dashboard'>Add To Doggo Dasboard</Link>
                
            </div>
            <div className = "result">
                <h2>Doggo Business 2</h2>
                <h3>Address 2</h3>
                <h3>Phone Number 2</h3>
                <Link to ='./dashboard'>Add To Doggo Dasboard</Link>
        </div>
        </div>
        )
    }

}
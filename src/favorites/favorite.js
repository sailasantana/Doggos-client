import React from 'react';
import './favorite.css'
import { Link } from 'react-router-dom';
import AddForm from '../add-review-form/add-review'
import Sidebar from '../sidebar/sidebar'



export default class Favorite extends React.Component {

    render(){

        return (
         <div>
            <Sidebar width={300} height={"100vh"}>
            <Link to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <Link to ='./add-review'>Review A Doggo Business</Link>
            <br></br>
            <br></br>
            <Link to ='./recommend'>Recommend A Business</Link>
            </Sidebar>
            <h2 className = "title">Your Saved Doggo Sites</h2>
            <div className= "container">
                    <div className = "favorite">  
                    <h3>Dog-Friendly Business 1</h3>
                    <h4>Address : 123 Furry Lane , New York, NY 11201</h4>
                    <h4>Telephone : 123-456-7891</h4>
                    
                    <button>Remove</button>
                    </div>
                    <div className = "favorite">  
                    <h3>Dog-Friendly Business 2</h3>
                    <h4>Address : 234 Furry Lane , New York, NY 11201</h4>
                    <h4>Telephone : 123-456-7891</h4>
                    
                    <button>Remove</button>
                    </div>
                    <div className = "favorite">  
                    <h3>Dog-Friendly Business 3</h3>
                    <h4>Address : 345 Furry Lane , New York, NY 11201</h4>
                    <h4>Telephone : 123-456-7891</h4>
                    
                    <button>Remove</button>
                    </div>
            </div>
            
        </div>
        )
    }
}
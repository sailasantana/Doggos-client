import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';




export default class AddForm extends React.Component {

    render(){
         
        return(
            <div>
            <Sidebar width={300} height={"100vh"}>
            <Link to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <Link to ='./dashboard'>Doggo Dashboard</Link>
            <br></br>
            <br></br>
            <Link to ='./recommend'>Recommend A Business</Link>
            </Sidebar>

            <form className ='form-container' >
                <div className = "input"> 
                <label for="type">Select a Business To Review:</label>
                <select name="type" id="type">
                <option value="Parks">Business 1</option>
                <option value="Bars">Business 2</option>
                <option value="Restaurants">Business 3</option> 
                </select>
                </div>
                <div className = "input">       
                <label for="review" >Tell Us What You Think!</label>
                <textarea type="text" id="review" name="review" value="Pawsitively Splendid!" />
                </div>
                <Link to ='./dashboard'>Submit</Link>
                </form>
                </div>
         )
    }
}
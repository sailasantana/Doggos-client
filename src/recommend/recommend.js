import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar'
import LogOut from '../loginSignup/logout'



export default class Recommend extends React.Component {

    state = {
        submit: false 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        

        this.setState({submit : true});


    }

    render(){



        return(
            <div>
            <Sidebar width={300} height={"100vh"}>
            <Link to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <Link to ='./dashboard'>My Dashboard</Link>
            <br></br>
            <br></br>
            <Link to ='./add-review'>Review A Doggo Business</Link>
            </Sidebar>

            <form className ='form-container' onSubmit = {this.handleSubmit} >
                <h1>Recommend A Business To Add To The Doggo Directory</h1>
                <div className = "input"> 
                <label for="type">Name:</label>
                <input type="text" id="name" name="name" value="Paw Haven" />
                </div>
                <div className = "input"> 
                <label for="type">Type Of Business:</label>
                <select name="type" id="type">
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Parks">Park</option>
                <option value="Bars">Bar</option>
                <option value="Restaurants">Restaurant</option> 
                <option value="Veterinarian Services">Veterinarian Services</option>
                <option value="Dog Beaches">Dog Beach</option>
                <option value="Other">Other</option>
                </select>   
                </div>
                <div className = "input">       
                <label for="address" >Address:</label>
                <p>Please include Street Address, City, State and Zip</p>
                <textarea type="text" id="address" name="address" value="123 Fluffy Lane, Brooklyn, NY 11201" />
                </div>
                <input type="submit" value="Recommend" className="button" />
                </form>
                <div className = "results"> {this.state.submit ? <p>Your recommendation was successfully submitted. It will be reviewed by our Doggo Administrator. Thank you!</p> : null}</div>
                </div>
        )
    }
}
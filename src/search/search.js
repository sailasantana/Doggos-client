import React from 'react';
import './search-form.css'
import Results from '../results/results'
import { Link } from 'react-router-dom';


export default class SearchForm extends React.Component {

    state = {
        clicked : false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({clicked : true});
    }

    render(){
        return(
                <div>
                <h1>Begin Your Search</h1>
                <form className ='form-container' onSubmit={this.handleSubmit}>
                <div className = "input">       
                <label for="fname" >Zip Code:</label>
                <input type="text" id="zip" name="zip" value="10011" />
                </div>
                <div className = "input"> 
                <label for="type">Type of Activity:</label>
                <select name="type" id="type">
                <option value="Parks">Parks</option>
                <option value="Bars">Bars</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Veterinarian Services">Veterinarian Services</option>
                <option value="Dog Beaches">Dog Beaches</option>
                </select>
                </div>
                <input type="submit" value="Oh the places your doggo will go!" className="button" />
                </form>
                <div className = "results"> {this.state.clicked ? <Results /> : null}</div>
                </div>
        )
    }
}

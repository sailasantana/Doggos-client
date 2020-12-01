import React from 'react';
import './search-form.css'


export default class SearchForm extends React.Component {


    render(){
        return(
                <form className ='form-container'>
                <label for="fname">Zip Code:</label>
                <input type="text" id="zip" name="zip" value="10011" />
                <label for="type">Type of Activity:</label>
                <select name="type" id="type">
                <option value="Parks">Parks</option>
                <option value="Bars">Bars</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Veterinarian Services">Veterinarian Services</option>
                <option value="Dog Beaches">Dog Beaches</option>
                </select>
                <button>Take Doggo!</button>
                </form>
        )
    }
}

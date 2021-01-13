import React from 'react';
import './search-form.css'
import Results from '../results/results'
import { Link } from 'react-router-dom';
import config from '../config'
import DoggoContext from '../context'



export default class SearchForm extends React.Component {

    state = {
        clicked : false,
        places : []
    }
   

    static contextType = DoggoContext;


    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({clicked : true});

        const searchValues = {
            zip: e.target['zip'].value,
            type: e.target['type'].value
           
           
        };
        console.log(searchValues)

        fetch(`${config.API_ENDPOINT}/api/search`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(searchValues),
        })
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            return res.json()
          })
          .then(places => {
            this.context.setLocations(places)
            this.setState(places)
          })
          .catch(error => {
            alert({error})
          })


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

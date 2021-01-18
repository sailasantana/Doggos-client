import React from 'react';
import './favorite.css'
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar'
import DoggoContext from '../context'
import config from '../config'



export default class Favorite extends React.Component {

    static contextType = DoggoContext;

    handleDelete = () => {
        const id = this.props.id;
        console.log(id)
  
        fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/dashboard/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
        .then (res => {
          if (!res.ok) {
            return res.json().then(e => Promise.reject(e));
          }
          return null;
        })
        .then(() => {
          this.context.deleteSpot(id);
        })
        .catch(error => {
          console.error({error});
        });

    }

    render(){

        console.log(this.context)

        let spots = this.context.savedSpots.map((spot , i) => {
            return (
                <div className = "favorite" key = {this.context.savedSpots[i].id}> 
                <h3 className = "title">{this.context.savedSpots[i].title}</h3>
                <h4>{this.context.savedSpots[i].doggoaddress}</h4>
                <button onClick = {this.handleDelete}>Remove</button>
                </div>
            )
        })


        return (
         <div>
            <Sidebar width={300} height={"100vh"}>
            <Link to ='./search'>Doggo Search</Link>
            <br></br>
            <br></br>
            <Link to ='./recommend'>Recommend A Business</Link>
            </Sidebar>
            <h2 className = "title">Your Saved Doggo Sites</h2>
            <div className= "container">
            {spots}
            </div>
            
        </div>
        )
    }
}
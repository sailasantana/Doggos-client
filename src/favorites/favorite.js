import React from 'react';
import './favorite.css'
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar'
import DoggoContext from '../context'
import config from '../config'
import StarRating from './rating'
import TokenService from '../client-services/token';



export default class Favorite extends React.Component {

    static contextType = DoggoContext;

    handleDelete = (e) => {
        const id = this.props.id;

  
        fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/dashboard/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'session_token': TokenService.getAuthToken()
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

    render () {  
        const {title , id, doggoaddress, rating} = this.props; 
        console.log(this.props)
  
        return (
          <div className='Spot'>
  
            <h2 className='Spot_title'>
              
                {title}
            
            </h2>
            <p className='Spot_address'>
              
              {doggoaddress}
          
          </p>


  
            <button 
              className='Spot_delete' 
              type='button'
              onClick={this.handleDelete}>
              Remove
  
            </button>
  
           
          </div>
        )
      }
}
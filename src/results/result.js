import React from 'react';
import {Link} from 'react-router-dom'
import config from '../config'
import DoggoContext from '../context'



export default class Result extends React.Component {

    static contextType = DoggoContext

    constructor(props){
        super(props)

        this.state = {
            error : null
        }
    }
   


    handleAdd = (e) => {
        console.log('abc')
     

        let newSpot = {
            title : this.props.title,
            /*e.target['Result_title'].value,*/
            doggoaddress: this.props.address
            /*e.target['Result_address'].value*/
        }

        console.log(this.context)

       fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/dashboard`,  {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newSpot),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(spot => {
            console.log(spot)
            this.context.addToSaved(spot)
        })
        .catch(error => {
            alert({error})
        })
    }

    

    render () {  
      const {title , address, operational, overall_rating} = this.props; 

      return (
        <div className='Result'>

          <h2 className='Result_title' id='Result_title' name='Result_title'>
            
              {title}
          
          </h2>
          <p className='Result_address' id ="Result_address" name = "Result_address">
            
            {address}
        
        </p>
        <p className='Result_operational'>
            
            status: {operational}
        
        </p>
        <p className='Result_rating'>
            
            overall user rating: {overall_rating}
        
        </p>

          <button 
            className='Add_to_board' 
            onClick = {this.handleAdd}
            type='button'>
           
            Add To Doggo Board

          </button>
         
        
         
        </div>
      )
    }
  }
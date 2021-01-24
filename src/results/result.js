import React from 'react';
import {Link} from 'react-router-dom'
import TokenService from '../client-services/token';
import config from '../config'
import DoggoContext from '../context'



export default class Result extends React.Component {

    static contextType = DoggoContext

    constructor(props){
        super(props)

        this.state = {
            error : null,
            selectedPlaceId: ''
        }
    }
   


    handleAdd = (e) => {
     
        let newSpot = {
            title : this.props.title,
            doggoaddress: this.props.address
        }

       fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/dashboard`,  {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'session_token': TokenService.getAuthToken()
        },
        body: JSON.stringify(newSpot),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            alert('Doggo Spot Successfully Added')
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

    handleGet = (event) => {

        let place_id = this.props.place_id
        this.setState({selectedPlaceId:place_id})
     
        fetch(`${config.API_ENDPOINT}/api/details/${place_id}`,  {
         method: 'GET',
         headers: {
             'content-type': 'application/json',
             'session_token': TokenService.getAuthToken()
         }
         })
         .then(res => {
             if(!res.ok){
                 return res.json().then(e => Promise.reject(e))
             }
             return res.json()
         })
         .then(details => {
             this.context.setDetailsToDisplay(details)
            })
         .catch(error => {
             alert({error})
         })
    }


    handleClick = (event) => {
   
        this.setState({learnMore:false})
    }
    

    render () {  
      const {title , address, overall_rating, place_id, id} = this.props; 
          

        return (
        <div className='Result'>

          <h2 className='Result_title' id='Result_title' name='Result_title'>
            
              {title}
          
          </h2>
          <p className='Result_address' id ="Result_address" name = "Result_address">
            
            {address}
        
          </p>
          <p className='Result_rating'>
            
            overall user rating: {overall_rating}
        
          </p>
          <button 
            className='Get_details' 
            onClick = {this.handleGet}
            type='button' 
            value = {place_id}    
            >
           
            Learn More
         </button>
          {this.context.detailsToDisplay.result ? 
                        <div>
                        <p>{this.context.detailsToDisplay.result.website}</p>
                        <p>{this.context.detailsToDisplay.result.formatted_phone_number}</p>
                        <ul> <p>Reviews:</p>
                            <li>"{this.context.detailsToDisplay.result.reviews[0].text}" - {this.context.detailsToDisplay.result.reviews[0].author_name} </li>
                            <li>"{this.context.detailsToDisplay.result.reviews[2].text}" - {this.context.detailsToDisplay.result.reviews[2].author_name} </li>
                            <li>"{this.context.detailsToDisplay.result.reviews[4].text}" - {this.context.detailsToDisplay.result.reviews[4].author_name} </li>
                        </ul>
                        <button onClick = {this.handleClick}>x</button>
        
                        </div> : null}


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
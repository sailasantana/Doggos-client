
import React from 'react';
import './rating.css';
//import { FaStar } from 'react-icons/fa';

export default class StarRating extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rating : null,
            hover : null
        }
    }

    setRating = (ratingValue) => {
        this.setState({rating:ratingValue})
    }

    setHoverRating = (ratingValue) => {
        this.setState({hover: ratingValue})
    }

    render(){

        return(
          <div>
              {[...Array(5)].map((star,i) => {
                  const ratingValue = i + 1;

                  return(
                      <label>
                          <input
                          type = "radio"
                          name = "rating"
                          value = {ratingValue}
                          onClick = {this.setRating(ratingValue)}
                          onMouseEnter = {this.setHoverRating(ratingValue)}
                          onMouseLeave = {this.setHoverRating(null)} 
                          />
                          <FaStar
                            className = "star"
                            color = {ratingValue <= (this.state.hover || this.state.rating) ? "#ffc107" : "#e4e5e9"}
                            size = {100}
                            />
                      </label>
                  )
              })}
          </div>

        )
    }
}
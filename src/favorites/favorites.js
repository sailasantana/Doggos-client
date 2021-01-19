import React from 'react';
import { Link } from 'react-router-dom';
import favorite from './favorite'
import DoggoContext from '../context'
import Favorite from './favorite';
import Sidebar from '../sidebar/sidebar';


export default class Favorites extends React.Component {

    static contextType = DoggoContext;

   

    render(){
    
   
        let spots = this.context.savedSpots.map((spot , i) => {
            return (
                <ul key = {this.context.savedSpots[i].id}>
                    
                <li >
                    <Favorite
                        title={this.context.savedSpots[i].title}
                        doggoaddress={this.context.savedSpots[i].doggoaddress}
                        id={this.context.savedSpots[i].id}
                      />  
                </li>
                
                </ul>

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
           <div>{spots}</div>
        </div>  ) 
   
    }

}
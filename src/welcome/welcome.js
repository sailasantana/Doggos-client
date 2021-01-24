import React from 'react';
import './welcome.css'
import {Link} from 'react-router-dom'



export default class Welcome extends React.Component {

    render(){

        return(
           <div>
            <head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@300&display=swap" rel="stylesheet"/>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            </head>
                <img className = "logo" src="images/logo-doggos.png" width="200" height="200"/>
                <button className = "btn"><Link to='/login'> Log in or Sign up here </Link></button>
                <div class="container">
                    <div class="box">
            
                        <div class="img-box"  title="Search" >
                            <img src="https://www.californiabeaches.com/wp-content/uploads/2017/03/bigs-Jack-Russell-Terrier-Pup-digging-in-a-California-beach-e1-Large.jpg" alt="" />
                            </div>
                        
                        <div class="content">
                        <h2>Oh the places your doggo will go</h2>
                            <p>Use DoggoSearch to find hundreds of activities for you AND your furry bff. Doggone good time guranteed!</p>
                    
                        </div>  
                    
                    </div>
                    <div class="box">
            
                        <div class="img-box"  title="Favorite" 
                            ><img src="https://metro.co.uk/wp-content/uploads/2019/08/PinPep_HotelsdotCom_CanineCritic_003-0d70.jpg?quality=90&strip=all" alt="" /></div>
                        
                        <div class="content">
                            <h2>Never miss an Op-paw-tunity</h2>
                            <p>Maintain a dashboard of all your favorite spots/activites or save new ones to visit someday!</p>

                        </div>  

                    </div>

                    <div class="box">
                    
                        <div class="img-box"  title="Recommend"
                            ><img src="https://i.pinimg.com/originals/1b/4a/c4/1b4ac4e303c3cfc54a38ef0432f08f6e.jpg" alt="" /></div>
                        
                        <div class="content">
                            <h2>Be-leash me, you gotto go...</h2>
                            <p>Help DoggosWelcome grow its directory by recomending businesses you don't see included</p>

                        </div>  

                    </div>

                </div>    
            </div>     
        )
    }
}
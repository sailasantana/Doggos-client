import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom';
import MapWrapped from './map/map';
import Favorites from './favorites/favorites';
import './map/map.css';
import Recommend from './recommend/recommend';
import DoggoContext from './context'
import React from 'react';
import SearchForm from './search/search'
import StarRating from './favorites/rating'
import LogOut from './loginSignup/logout'
import Welcome from './welcome/welcome'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      places : [],
      user_name: '',
      savedSpots : [],
      detailsToDisplay: []
    }
  }

  getPlaces = (places) => {
    this.setState({places: places })
  }

  updateUserName = (user) => {

    this.setState({user_name: user})
    
  }

  setUserSpots = spots => {
    this.setState({savedSpots : spots})

  }

  setDetailsToDisplay = details => {
    this.setState({detailsToDisplay: details})
  }

  addToSaved = (spot) => {
    this.setState({ savedSpots: [...this.state.savedSpots, spot]})
  }

  //validate the data types of spot.id and id and see if they are the same.
  deleteSpot = (id) => {
    const { savedSpots } = this.state
 
    console.log(typeof(id))
    this.setState({
      posts: savedSpots.filter (spot => {
        console.log(typeof(spot.id))
        return spot.id !== id
      })
    })

  }

  render(){

    const contextValues = {
      locations: this.state.places,
      setLocations : this.getPlaces,
      user_name : this.state.user_name,
      setUserName : this.updateUserName,
      savedSpots : this.state.savedSpots,
      addToSaved : this.addToSaved,
      setUserSpots : this.setUserSpots,
      deleteSpot : this.deleteSpot,
      setDetailsToDisplay: this.setDetailsToDisplay,
      detailsToDisplay: this.state.detailsToDisplay
      
    }
  

  return (

    <DoggoContext.Provider value={contextValues}>

    <div className="App">
    <Route exact path='/' component={Welcome} />
      <Route exact path='/login' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/search' component={LogOut} />
      <Route path='/search' component={SearchForm} />
      <Route path='/dashboard' component={LogOut} />
      <Route path='/dashboard' component={Favorites} />
      <Route path='/recommend' component={LogOut} />
      <Route path='/recommend' component={Recommend} />
    </div>
    </ DoggoContext.Provider >

    )

  } 
}


export default App;

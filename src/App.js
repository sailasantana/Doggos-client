import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom';
import MapWrapped from './map/map';
import Favorites from './favorites/favorites';
import './map/map.css';
import Recommend from './recommend/recommend';
import DoggoContext from './context';
import React from 'react';
import SearchForm from './search/search';
import StarRating from './favorites/rating';
import LogOut from './loginSignup/logout';
import TokenService from './client-services/token';
import config from './config';
import { withRouter } from 'react-router-dom';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      places : [],
      user_name: '',
      savedSpots : [],
      detailsToDisplay: [],
      currentZip: ''
    }
  }

  componentDidMount( ){

    let user_name = localStorage.getItem('user_name')
    
    this.setState({user_name:user_name})

    fetch(`${config.API_ENDPOINT}/api/${user_name}/dashboard`, {
      headers: {
        'session_token':`${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(e => Promise.reject(e))
      }
      console.log(res)
      return res.json()
    })

    .then(spots => {
      console.log(spots)
      
      this.setUserSpots(spots)
    })
    .catch(error => {
      alert('You must be logged in to continue')
      this.props.history.push('/login')
    })
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


  addToSaved = (spot) => {
    this.setState({ savedSpots: [...this.state.savedSpots, spot]})
  }

  deleteSpot = (id) => {
    const { savedSpots } = this.state
 
    this.setState({
      savedSpots: savedSpots.filter (spot => {
        return spot.id !== id
      })
    })

  }

  setCurrentZip = (zip) => {
    this.setState({currentZip: zip})

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
      currentZip: this.state.currentZip,
      setCurrentZip: this.setCurrentZip      
    }
  

  return (

    <DoggoContext.Provider value={contextValues}>

    <div className="App">
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


export default withRouter(App);

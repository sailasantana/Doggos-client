import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom';
import MapWrapped from './map/map';
import Favorite from './favorites/favorite';
import './map/map.css';
import Recommend from './recommend/recommend';
import DoggoContext from './context'
import React from 'react';
import SearchForm from './search/search'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      places : [],
      user_name: '',
      savedSpots : []
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

  addToSaved = (spot) => {
    this.setState({ savedSpots: [...this.state.savedSpots, spot]})
  }

  deleteSpot = (id) => {
    const { savedSpots } = this.state
 
    this.setState({
      posts: savedSpots.filter (spot => {
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
      deleteSpot : this.deleteSpot
      

    }
  

  return (
    <DoggoContext.Provider value={contextValues}>

    <div className="App">
      <Route exact path='/' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/search' component={SearchForm} />

      <Route path='/dashboard' component={Favorite} />
      <Route path='/recommend' component={Recommend} />
    </div>
    </ DoggoContext.Provider >

    )

  } 
}





export default App;

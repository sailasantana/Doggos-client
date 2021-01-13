import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom';
import MapWrapped from './map/map';
import Favorite from './favorites/favorite';
import './map/map.css';
import AddForm from './add-review-form/add-review';
import Recommend from './recommend/recommend';
import DoggoContext from './context'
import React from 'react';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      places : [],
      user_name: ''
    }
  }

  getPlaces = (places) => {
    this.setState({places: places })
  }

  updateUserName = (user) => {

    this.setState({username: user})
    
  }

  render(){

    const contextValues = {
      locations: this.state.places,
      setLocations : this.getPlaces,
      user_name : this.state.username,
      setUserName : this.updateUserName

    }
  

  return (
    <DoggoContext.Provider value={contextValues}>

    <div className="App">
      <Route exact path='/' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route
        path='/search'
        render={(props) => (
        <div style={{ width: "50vw", height: "75vh" }} className = "map"> 
         <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                  
                   `}
                   loadingElement={<div style={{ height: "100%" }} />}
                      containerElement={<div style={{ height: "100%" }} />}
                       mapElement={<div style={{ height: "100%" }} />}
                       />
                       </div>
         )
       }
      />
      <Route path='/dashboard' component={Favorite} />
      <Route path='/add-review' component={AddForm} />
      <Route path='/recommend' component={Recommend} />
    </div>
    </ DoggoContext.Provider >

    )

  } 
}





export default App;

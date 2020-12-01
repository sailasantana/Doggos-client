import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom'
import MapWrapped from './map/map'
import Favorite from './favorites/favorite'
import './map/map.css'
import SearchForm from './search/search';


function App() {
  

  return (
    <div className="App">
      <Route exact path='/' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route
        path='/dashboard'
        render={(props) => (
        <div style={{ width: "40vw", height: "60vh" }} className = "map"> 
         <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  "AIzaSyB1lEVMUE9Vomieo5bDBKTQSTwcXqFqxP4"
                   }`}
                   loadingElement={<div style={{ height: "100%" }} />}
                      containerElement={<div style={{ height: "100%" }} />}
                       mapElement={<div style={{ height: "100%" }} />}
                       />
                       </div>
         )
       }
      />
      <Route path='/dashboard' component={SearchForm} />
      <Route path='/dashboard' component={Favorite} />
    </div>
    )
}





export default App;

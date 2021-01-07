import LoginPage from './loginSignup/login-page';
import SignUp from './loginSignup/sign-up';
import {Route} from 'react-router-dom';
import MapWrapped from './map/map';
import Favorite from './favorites/favorite';
import './map/map.css';
import AddForm from './add-review-form/add-review';
import Recommend from './recommend/recommend';


function App() {
  

  return (
    <div className="App">
      <Route exact path='/' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route
        path='/search'
        render={(props) => (
        <div style={{ width: "50vw", height: "75vh" }} className = "map"> 
         <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  "AIzaSyAZ9e8yrmg_qJFoBB7Giz4ZKzQNPl7fDm4"
                   }`}
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
    )
}





export default App;

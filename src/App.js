import LoginPage from './login-page';
import SignUp from './sign-up';
import {Route} from 'react-router-dom'
import MapWrapped from './map'

function App() {
  
  //defaultProps = {
    //height: "100vh",
    //width: "100vw",
  //}

  return (
    <div className="App">
      <Route exact path='/' component={LoginPage} />
      <Route path='/sign-up' component={SignUp} />
      <Route
        path='/dashboard'
        render={(props) => (
          
         <MapWrapped
                style = {{height: "50vh", width: "50vh"}}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                process.env.REACT_APP_GOOGLE_KEY
                   }`}
                   loadingElement={<div style={{ height: "100%" }} />}
                      containerElement={<div style={{ height: "100%" }} />}
                       mapElement={<div style={{ height: "100%" }} />}
                       />
         )
       }
      />
    </div>)
}

   App.defaultProps = {
        height: "50vh",
        width: "50vw",    
      }


        //component={() => <MapWrapped
         // style =  {{ width : '100vw', height : '100 vh'}}
          //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            //process.env.REACT_APP_GOOGLE_KEY
          //}`}
          //loadingElement={<div style={{ height: "100%" }} />}
          //containerElement={<div style={{ height: "100%" }} />}
          //mapElement={<div style={{ height: "100%" }} />}
        ///>}
        ///>
 
    //</div>
 // );
//}

export default App;

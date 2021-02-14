import React from 'react';
import './search-form.css'
import Results from '../results/results'
import { Link } from 'react-router-dom';
import config from '../config'
import DoggoContext from '../context'
import MapWrapped from '../map/map';
import Sidebar from '../sidebar/sidebar'
import TokenService from '../client-services/token'
import LogOut from '../loginSignup/logout'



export default class SearchForm extends React.Component {

    static contextType = DoggoContext;


    constructor(props){
        super(props)
        
        this.zipInput = React.createRef()
        this.typeInput = React.createRef()
        
        this.state = {
            clicked : false,
            places : []
        }
    }

    componentDidMount(){
        const token = TokenService.getAuthToken();
        const options = {
            method : 'GET',
            headers : {
                'session_token' : token
            }
        }

        fetch( `${config.API_ENDPOINT}/api/validate`, options )
            .then( response => {
                if( response.ok ){
                    return response.json();
                }

                throw new Error( response.statusText );
            })
            .then( responseJson => {
                this.setState({
                    message : responseJson.message
                })
            })
            .catch( err => {
                console.log( err.message );
                this.props.history.push( '/login' );
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const searchValues = {
            zip: this.zipInput.current.value,
            type: this.typeInput.current.value   
        };

        this.context.setCurrentZip(this.zipInput.current.value)

        fetch(`${config.API_ENDPOINT}/api/search`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'session_token': TokenService.getAuthToken()

        },
        body: JSON.stringify(searchValues)
        })
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            
             return res.json()
          })
          .then(places => {

            this.context.setLocations(places)
            this.setState({
                clicked : true,
                places: places} 
            );


          })
          .catch(error => {
            this.context.setLocations({ results: [] })

              console.log(error)
        })


    }

    handleLogOut = () => {

        TokenService.clearAuthToken()
        console.log(this.props)
        this.props.history.push('/login')

    }

    render(){

        return(            
                <div className = "search-container">
                <Sidebar width={300} height={"100vh"} className = "side-bar"> 
                <br></br>           
                <Link className = "link1-button" to ='./dashboard'>Your Dashboard</Link>   
                <br></br>
                <br></br>
                <br></br>
                <Link className = "link2-button" to ='./recommend'>Recommend A Business</Link>
                <br></br>
                <button className="log-out-button" onClick = {this.handleLogOut}>Log out</button>
                </Sidebar>
                <div className = 'box-1'>
                <h1 className = "form-title">Begin Your Search</h1>
                <form className ='form-container' onSubmit={this.handleSubmit}>
                <div >       
                <label for="fname" >5 Digit Zip Code (US Only):</label>
                <input className = "fetch-input" ref = {this.zipInput} type="text" id="zip" name="zip" defaultValue = "10011"/>
                </div>
                <div > 
                <label for="type">Type of Activity:</label>
                <select ref = {this.typeInput} name="type" id="type" className = "fetch-input">
                <option value="Parks">Parks</option>
                <option value="Bars">Bars</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Veterinarian Services">Veterinarian Services</option>
                <option value="Dog Beaches">Beaches</option>
                <option value="Pet Hotels">Hotels</option>
                <option value="Groomers">Groomers</option>
                <option value="Hiking Trails"> Hiking Trails</option>
                <option value="Brunch">Brunch Spots</option>
                </select>
                </div>
                <input type="submit" value="Fetch!" className="fetch-button" />
                </form>
                <div className = 'image-container'> {!this.state.clicked ? <img className = "form-image" src = 'https://static01.nyt.com/images/2018/02/10/realestate/dogsofny-bkln/dogsofny-bkln-superJumbo.gif' /> : null}</div>
                <div className = "results"> {this.state.clicked ? <Results /> : null}</div>
                </div>
                </div>
        )
    }
}

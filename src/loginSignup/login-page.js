import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './sign-up'
import AuthApiService from '../client-services/auth-api-service'
import TokenService from '../client-services/token'
import DoggoContext from '../context'
import config from '../config'
import './login-signup.css'

export default class LoginPage extends React.Component {

    static contextType = DoggoContext;

    static defaultProps = {
        onValidLogin: () => {}
    };

    constructor(props) {
        super(props);
        this.userInput = React.createRef();
        this.passInput = React.createRef();
        this.state = {error: null};
    };

    // handle login authentication and validation on submit. //
    handleJwtLoginAuth = e => {
        e.preventDefault();
       
     
        AuthApiService.postLogin({
            user_name: this.userInput.current.value,
            password: this.passInput.current.value 
        })
        .then(res => {
        
            this.context.setUserName(this.userInput.current.value)
            TokenService.saveAuthToken(res.token);
            this.props.onValidLogin(); 

            fetch(`${config.API_ENDPOINT}/api/${this.userInput.current.value}/dashboard`, {
                headers: {
                  'session_token':`${TokenService.getAuthToken()}`
                }
              })
              .then(res => {
                if(!res.ok){
                  return res.json().then(e => Promise.reject(e))
                }
                return res.json()
              })

              .then(spots => {
                this.context.setUserSpots(spots)
              })
              .catch(error => {
                alert({error})
              })

            })
                
           
        .then(() => {
            this.props.history.push('/search')})
            
        .catch(res => {
            this.setState({
            error: alert("Invalid username or password. Please re-enter your credentials.")
                });
            });
    
    }


    render() {

          return(
            <div className="section">
            <div className="container">

                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                              <label for="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <form onSubmit={this.handleJwtLoginAuth}>
                                                <div className="form-group">
                                                    <input type="text" ref = {this.userInput}  name="user" id="user" className="form-style" placeholder="Your Username"  autocomplete="off"/>
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="password" ref = {this.passInput} name="password" id="password" className="form-style" placeholder="Your Password" i autocomplete="off"/>
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4">submit</button>
                                                </form>
                                              </div>
                                          </div>
                                      </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                               <form>
                                                <div className="form-group">
                                                    <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autocomplete="off"/>
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off"/>
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off"/>
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <a href="#" className="btn mt-4">submit</a>
                                                </form> 
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </div>





        )
    }


}

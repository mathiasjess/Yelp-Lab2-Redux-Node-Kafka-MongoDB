import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import registrationImg from '../../images/customer_registration.png'

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
    }
    //Bind the handlers to this class

    render() {
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return (
            <div>
                {/*{redirectVar}*/}
                <div class="regRow">
                    <div class="regColumn">
                        <div class="panel">
                            <div>
                                <h2>Sign in to Yelp</h2>
                            </div>
                            <div class="authHeader">
                                <p>New to Yelp?</p>
                                <Link to="/register" ><span></span> Sign Up</Link>
                            </div>

                        </div>
                        {/*<button onClick={this.handleCustomerRegistration}>New User?</button>
                                        <button onClick={this.handleRestaurantRegistration}>Restaurant Owner?</button>*/}
                        <div class="authlinks">
                            <Link to="/login/customerlogin" ><span class="glyphicon glyphicon-log-in"></span> Existing User?</Link>
                            <Link to="/login/restaurantlogin" ><span class="glyphicon glyphicon-log-in"></span> Restaurant Owner?</Link>
                        </div>  
                    </div>
                    <div class="regColumn">
                        <img src={registrationImg} />
                    </div>
                </div>
            </div>

        )
    }
}
//export Login Component
export default Login;
import React from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import registrationImg from '../../images/customer_registration.png'

//Define a Login Component
class Register extends React.Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            customerRegisterFlag: '',
            restaurantRegisterFlag: '',
        }

    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="regRow">
                    <div class="regColumn">
                        <div class="panel">
                            <div>
                                <h2>Sign Up for Yelp</h2>
                            </div>
                            <div class="authHeader">
                                <p>Existing User?</p>
                                <Link to="/login" ><span></span> Log In</Link>
                            </div>
                        </div>
                        {/*<button onClick={this.handleCustomerRegistration}>New User?</button>
                                        <button onClick={this.handleRestaurantRegistration}>Restaurant Owner?</button>*/}
                        <div class="authlinks">
                            <li><Link to="/register/customerregister" ><span class="glyphicon glyphicon-log-in"></span> New User?</Link></li>
                            <li><Link to="/register/restaurantregister" ><span class="glyphicon glyphicon-log-in"></span> Restaurant Owner?</Link></li>

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
export default Register;
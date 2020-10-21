import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {registerRestaurant} from '../../../actions/restaurantAction'

class restaurantRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            restaurantname : "",
            email : "",
            password : "",
            location : "",
            city: "",
            state : "",
            country : "",
            zipcode: "",
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name] :event.target.value
        })
    }

    submitRegister(event){
    //prevent page from refresh
    event.preventDefault();
    const restaurantRegistrationData = {
        restaurantname: this.state.restaurantname,
        email: this.state.email,
        password: this.state.password,
        location : this.state.location,
        city: this.state.city,
        state : this.state.state,
        country : this.state.country,
        zipcode: this.state.zipcode
    }
    console.log(restaurantRegistrationData)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/registerrestaurant/restaurantregister',restaurantRegistrationData)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            alert("Restaurant Registration successful")
            this.props.history.replace('/login/restaurantlogin');
        }
    })
    .catch(error=>{
        alert("Could not register")
    })
    }
    render() {
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="restaurantname" placeholder="Restaurant name" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="location" placeholder="Building, Street Name" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="city" placeholder="City" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="state" placeholder="state" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="country" placeholder="Country" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="zipcode" placeholder="zipcode" />
                    </div>
                    <button onClick={this.submitRegister} class="btn btn-danger">Sign Up</button>
                </div>

            </form>
        )
    }

}


export default restaurantRegister ;
import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { rooturl } from '../../config/settings'

 // @ts-ignore  
 import jwt_decode from "jwt-decode";


class CustomerLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:'',
            credentials : '',
            customerID: ''
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }
    ChangeHandler(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitLogin(event){
        event.preventDefault();
        const customerLoginData = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rooturl+'/customerloginroute/customerlogin',customerLoginData)
        .then(response => {
            if(response.data.data.message === "success"){
                console.log("The data got is", response.data.data.data)
                console.log("Token", response.data.data.token)
                this.setState({
                   credentials: response.data.data,
                   customerID : response.data.data.data._id
                })
                // this.props.customerLogin(response.data.data);
            }
            else if (response.data.message === "error"){
                alert("Invalid credentials")
            }
        })
    }
    render() {
        if (this.state.credentials){
            localStorage.setItem("token", this.state.credentials.token);
            var decoded = jwt_decode(this.state.credentials.token.split(' ')[1]);
            localStorage.setItem("id",decoded._id);
            localStorage.setItem("email",decoded.email);
            localStorage.setItem("name",this.state.credentials.firstName + ' '+ this.state.credentials.lastName);
            localStorage.setItem("role",decoded.role);
            localStorage.getItem("location",this.state.credentials.zipcode);
            this.props.history.replace(`/customerhomepage/${this.state.customerID}`);
        }
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitLogin} class="btn btn-danger">User Log In</button>
                </div>

            </form>
        )
    }

}

export default CustomerLogin;
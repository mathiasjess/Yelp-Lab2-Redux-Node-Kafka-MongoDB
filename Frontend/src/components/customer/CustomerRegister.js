import React from 'react'
import axios from 'axios';
import { rooturl } from '../../config/settings'
class customerRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName:'',
            lastName: '',
            email:'',
            password:'',
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitCustomerRegistration = this.submitCustomerRegistration.bind(this)
    }
    ChangeHandler(event){
        event.preventDefault();
        this.setState({
            [event.target.name] :event.target.value
        })
    }
    submitCustomerRegistration(event){
        //prevent page from refresh
        event.preventDefault();
        const customerRegistrationData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rooturl+'/customerregistrationroute/customerregister',customerRegistrationData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                alert("User Registration successful")
                this.props.history.replace('/login/customerlogin');
            }
        })
        .catch(error=>{
            console.log(error.response.data.msg)
            alert(error.response.data.msg)
        })
    }
    render() {
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group" style={{display:"flex", width:"30%", justifyContent:"space-between"}}>
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="firstName" placeholder="First Name" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="lastName" placeholder="Last Name" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitCustomerRegistration} class="btn btn-danger">Sign Up</button>
                </div>

            </form>
        )
    }

}

export default customerRegister;
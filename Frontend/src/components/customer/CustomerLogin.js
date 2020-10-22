import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {customerLogin} from '../../actions/customerAction'
 // @ts-ignore  
 import jwt_decode from "jwt-decode";


class CustomerLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:'',
            token : '',
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
        axios.post('http://localhost:3001/customerloginroute/customerlogin',customerLoginData)
        .then(response => {
            if(response.data.message === "success"){
                console.log("The data got is", response.data.data)
                this.setState({
                   token: response.data.token,
                   customerID : response.data.data._id
                })
                this.props.customerLogin(response.data.data);
            }
            else if (response.data.message === "error"){
                alert("Invalid credentials")
            }
        })
    }
        // componentDidMount(){
        // if(Cookies.get('id')){
        //     if (Cookies.get('role') == 'customer'){
        //         this.props.history.replace(`/customerhomepage/${Cookies.get('id')}`);
        //     }
        // }
        // else{
        //     this.props.history.push(`/login/customerlogin`);
        // }
    // }
    render() {
        if (this.state.token.length > 0){
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("id",decoded._id);
            localStorage.setItem("email",decoded.email);
            localStorage.setItem("role",decoded.role);
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

function mapDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return {
        customerLogin : (data) => dispatch(customerLogin(data))
    }
}
export default connect(null,mapDispatchToProps)(CustomerLogin);
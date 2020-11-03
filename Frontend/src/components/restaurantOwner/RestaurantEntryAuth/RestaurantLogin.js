import React from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import {restaurantLogin} from '../../../actions/restaurantAction'
 // @ts-ignore  
 import jwt_decode from "jwt-decode";
 import { rooturl } from '../../../config/settings';

// const jwt_decode = require('jwt-decode');

class RestaurantLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            token : '',
            restaurantId : ''
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
    // componentDidMount(){
    //     if(!Cookies.get('id')){
    //         this.props.history.replace('/login/restaurantlogin');
    //     }
    //     else if (!Cookies.get('role') === 'restaurant'){
    //         this.props.history.replace(`/restauranthomepage/${Cookies.get('id')}`);
    //     }
    // }

    submitLogin(event){
        let responseObj = {}
        event.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rooturl+'/restaurantloginroute/restaurantlogin',data)
        .then(response => {
            console.log( response.data.data)
            console.log("Token", response.data.data.token)
            console.log("Data", response.data.data.data)
            console.log("Message", response.data.data.message)
            if(response.data.data.message === "success"){
                this.setState({
                    token : response.data.data.token,
                    restaurantId : response.data.data.data._id
                })
                this.props.restaurantLogin(response.data.data.data);
            }
            else if (response.data.data.message === "error"){
                alert("Invalid credentials")
            }
        })
    }
    render() {
        if (this.state.token.length > 0){
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("id",decoded._id);
            localStorage.setItem("email",decoded.email);
            localStorage.setItem("role",decoded.role);
            localStorage.setItem("name",decoded.name);
            this.props.history.replace(`/restauranthomepage/${this.state.restaurantId}`);
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
                    <button onClick={this.submitLogin} class="btn btn-danger">Restaurant Log In</button>
                </div>

            </form>
        )
    }

}

function mapDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return {
        restaurantLogin : (data) => dispatch(restaurantLogin(data))
    }
}
export default connect(null,mapDispatchToProps)(RestaurantLogin);
// export default RestaurantLogin; 
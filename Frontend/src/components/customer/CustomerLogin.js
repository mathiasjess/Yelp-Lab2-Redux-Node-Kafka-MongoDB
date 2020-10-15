import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {customerLogin} from '../../actions/customerAction'


class CustomerLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:''
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
        axios.post('http://localhost:3001/customerlogin/customerlogin',customerLoginData)
        .then(response => {
            if(response.data.message === "success"){
                console.log("The data got is", response.data.data)
                Cookies.set('id',response.data.data.id)
                Cookies.set('role','customer')
                console.log("Cookies ID", Cookies.get('id'))
                console.log("Cookies role", Cookies.get('role'))
                // console.log('Getting Cookie ID', Cookies.get('id'))
                this.props.customerLogin(response.data.data);
                
                this.props.history.replace(`/customerhomepage/${response.data.data.id}`);
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
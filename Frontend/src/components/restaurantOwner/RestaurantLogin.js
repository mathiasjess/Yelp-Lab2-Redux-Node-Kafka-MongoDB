import React from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux';
import {restaurantLogin} from '../../actions/restaurantAction'

class RestaurantLogin extends React.Component {
    constructor(props) {
        super(props)
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
    componentDidMount(){
        if(!Cookies.get('id')){
            this.props.history.replace('/login/restaurantlogin');
        }
        else if (!Cookies.get('role') === 'restaurant'){
            this.props.history.replace(`/restauranthomepage/${Cookies.get('id')}`);
        }
    }

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
        axios.post('http://localhost:3001/restaurant/restaurantlogin',data)
        .then(response => {
            if(response.data.message === "success"){
                console.log("The data got is", response.data.data)
                Cookies.set('id',response.data.data.restaurantId)
                Cookies.set('role','restaurant')
                console.log("Cookies ID", Cookies.get('id'))
                console.log("Cookies role", Cookies.get('role'))
                // console.log('Getting Cookie ID', Cookies.get('id'))
                this.props.restaurantLogin(response.data.data);
                
                this.props.history.replace(`/restauranthomepage/${response.data.data.restaurantId}`);
            }
            else if (response.data.message === "error"){
                alert("Invalid credentials")
            }
        })
    }
    // componentDidMount(){
        // if(Cookies.get('id')){
        //     if (Cookies.get('role') == 'restaurant'){
        //         this.props.history.replace(`/restauranthomepage/${Cookies.get('id')}`);
        //     }
        // }
        // else{
        //     this.props.history.push(`/login/restaurantlogin`);
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
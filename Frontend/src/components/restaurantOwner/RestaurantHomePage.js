import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantHomePage.css'
import RestaurantProfile from './RestaurantProfile'
import UpdateRestaurantProfile from './UpdateRestaurantProfile'
import { connect } from 'react-redux';
import Orders from './Orders/Orders'
import Menu from './AddMenu'
import Events from './Events'


class RestaurantHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homePageFlag: true,
            updateProfileFlag: false,
            addMenuFlag: false,
            ordersFlag:false,
            eventsFlag:false,
            profileData: ''
        }
        this.handleMainProfile = this.handleMainProfile.bind(this)
        this.handleUpdateRestaurantProfile= this.handleUpdateRestaurantProfile.bind(this)
        this.handleAddMenu = this.handleAddMenu.bind(this)
        this.handleOrders = this.handleOrders.bind(this)
        this.handleEvents = this.handleEvents.bind(this)

    }
    handleMainProfile(){
        this.setState({
            homePageFlag: true,
            updateProfileFlag: false,
            addMenuFlag:false,
            ordersFlag:false,
            eventsFlag:false
        })

    }
    handleUpdateRestaurantProfile() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: true,
            addMenuFlag:false,
            ordersFlag:false,
            eventsFlag:false
        })
    }
    handleAddMenu() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: false,
            addMenuFlag:true,
            ordersFlag:false,
            eventsFlag:false
        })
    }
    handleOrders() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: false,
            addMenuFlag:false,
            ordersFlag:true,
            eventsFlag:false
        })
    }

    handleEvents(){
        this.setState({
            homePageFlag: false,
            updateProfileFlag: false,
            addMenuFlag:false,
            ordersFlag:false,
            eventsFlag:true
        })

    }

    componentDidMount() {
        this.setState({
            homePageFlag: true,
            updateProfileFlag: false,
            addMenuFlag: false,
            ordersFlag:false,
            eventsFlag:false
        })
    }
    render() {
        return (
            <div>
            <div class="split left">
                    <div class="leftTop">
                        <h2>{this.props.user.restaurantName}</h2>
                        <h6>{this.props.user.location}, {this.props.user.city}</h6>
                        <h6>{this.props.user.zipcode}</h6>
                    </div>
                    <div class="centeredLeft">

                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to='#' id='handleMainProfile' class="nav-link" onClick={this.handleMainProfile}>View Profile</Link>
                                {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                            </li>
                            <li class="nav-item">
                                <Link to='#' class="nav-link" onClick={this.handleUpdateRestaurantProfile} >Update  Restaurant Profile</Link>
                                {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                            </li>
                            <li class="nav-item">
                                <Link to = '#' class="nav-link" onClick = {this.handleAddMenu}>Add Dishes to Menu</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/viewcustomerreviews' class="nav-link disabled" >Reviews</Link>
                            </li>
                            <li class="nav-item">
                                <Link to = '/orders' class="nav-link disabled" onClick={this.handleOrders}>Orders</Link>
                            </li>
                            <li class="nav-item">
                            <Link to = '#' class="nav-link disabled" onClick={this.handleEvents}> Add Events</Link>
                            </li>
                        </ul>

                    </div>
                </div>

                <div class="split right">
                    {this.state.homePageFlag && <RestaurantProfile />}
                    {this.state.updateProfileFlag && <UpdateRestaurantProfile />}
                    {this.state.addMenuFlag && <Menu />}
                    {this.state.ordersFlag && <Orders />}
                    {this.state.eventsFlag && <Events />}
                </div>
        </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(RestaurantHomePage);
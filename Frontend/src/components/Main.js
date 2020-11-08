import React, { Component } from 'react';
import landingPageHeader from './LandingPage/landingPageHeader';
import landingPageDescription from './LandingPage/landingPageDescription';
import NavBar from './LandingPage/Navbar';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/Register'
import CustomerRegister from './customer/CustomerRegister'
import RestaurantRegister from './restaurantOwner/RestaurantEntryAuth/RestaurantRegister'
import CustomerLogin from './customer/CustomerLogin'
import RestaurantLogin from './restaurantOwner/RestaurantEntryAuth/RestaurantLogin'
import CustomerHomePage from './customer/CustomerHomePage'
import RestaurantHomePage from './restaurantOwner/RestaurantProfile/RestaurantHomePage'
import DisplayMenu from './restaurantOwner/RestaurantMenu/DisplayMenu'
import DishDetails from './restaurantOwner/RestaurantMenu/DishDetails'
import DisplayEvents from './restaurantOwner/Events/DisplayEvents'
import EditEvent from './restaurantOwner/EditEvent'
import EventList from './restaurantOwner/Events/EventList'
import RestaurantViewOfCustomer from './restaurantOwner/CustomerView/RestaurantViewOfCustomer'
import Orders from './restaurantOwner/Orders/Orders'
import UpdateOrder from './restaurantOwner/Orders/UpdateOrder'
import CustomerReviews from './restaurantOwner/reviews/CustomerReviews'
import UpdateCustomerProfile from './customer/Profile/UpdateCustomerProfile'
import SearchRestaurant from './customer/Search/SearchRestaurant'
import CustomerViewofRestaurant from './customer/Search/CustomerViewofRestaurant'
import MainEventsPage from './customer/Events/MainEventPage'
import IndividualEventDetails from './customer/Events/IndividualEventDetails'
import CustomerEvents from './customer/Events/CustomerRegisteredevents'
import WriteaReview from './customer/review/WriteReview'
import CustomerOrders from './customer/Orders/CustomerOrders'
import CustomerOrderHistory from './customer/Orders/CustomerOrderHistory'
import CustomerOrderDetails from './customer/Orders/CustomerOrderDetails'
import IndividualDishDetails from './customer/Orders/IndividualDishDetailsC'
import AllCustomers from './customer/Friends/Allcustomers'
import ChatPage from './restaurantOwner/Messaging/ChatPage'
import ChatHistory from './restaurantOwner/Messaging/ChatHistory'
import OtherUsersProfileDetails from './customer/Profile/OtherUsersProfileDetails'
import { Switch, Route, withRouter } from 'react-router-dom';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <div id="site-content">
                    <Route path="/" component={NavBar} />
                    <Route
                        path="/register"
                        render={props => <Register {...props} />}
                    />
                    <Route
                        path="/register/customerregister"
                        render={props => <CustomerRegister {...props} />}
                    />
                    <Route
                        path="/register/restaurantregister"
                        render={props => <RestaurantRegister {...props} />}
                    />
                    <Route
                        path="/login"
                        render={props => <Login {...props} />}
                    />
                    <Route
                        path="/login/customerlogin"
                        render={props => <CustomerLogin {...props} />}
                    />
                    <Route
                        path="/login/restaurantlogin"
                        render={props => <RestaurantLogin {...props} />}
                    />
                    <Route
                        path="/customerhomepage/:id"
                        render={props => <CustomerHomePage {...props} />}
                    />
                    <Route
                        path="/restauranthomepage/:id"
                        render={props => <RestaurantHomePage  {...props} />}
                    />
                    <Route
                        path="/displaymenu"
                        render={props => <DisplayMenu  {...props} />}
                    />
                    <Route
                        path="/dishdetails/:id"
                        render={props => <DishDetails  {...props} />}
                    />
                    <Route
                        path="/orders"
                        render={props => <Orders  {...props} />}
                    />
                    <Route
                        path="/updateorder/:id"
                        render={props => <UpdateOrder  {...props} />}
                    />
                    <Route
                        path="/displayevents"
                        render={props => <DisplayEvents  {...props} />}
                    />
                    <Route
                        path="/editevent/:id"
                        render={props => <EditEvent  {...props} />}
                    />
                    <Route
                        path="/restaurantviewofcustomer"
                        render={props => <RestaurantViewOfCustomer {...props} />}
                    />
                    <Route
                        path="/eventlist/:id"
                        render={props => <EventList {...props} />}
                    />
                    <Route
                        path="/viewcustomerreviews"
                        render={props => <CustomerReviews {...props} />}
                    />
                    <Route
                        path="/updatecustomerprofile"
                        render={props => <UpdateCustomerProfile  {...props} />}
                    />
                    <Route
                        path="/searchrestaurant"
                        render={props => <SearchRestaurant  {...props} />}
                    />
                    <Route
                        path="/customerviewofrestaurant/:id"
                        render={props => <CustomerViewofRestaurant  {...props} />}
                    />
                    <Route
                        path="/writereview/:id"
                        render={props => <WriteaReview  {...props} />}
                    />
                    <Route
                        path="/customerorder/:id"
                        render={props => <CustomerOrders  {...props} />}
                    />
                    <Route
                        path="/customerorderdetails/:id"
                        render={props => <CustomerOrderDetails  {...props} />}
                    />
                    <Route
                        path="/customerorderhistory"
                        render={props => <CustomerOrderHistory  {...props} />}
                    />
                    <Route
                        path="/mainevents"
                        render={props => <MainEventsPage  {...props} />}
                    />
                    <Route
                        path="/individualeventdetails/:id"
                        render={props => <IndividualEventDetails {...props} />}
                    />
                    <Route
                        path="/customerevents/:id"
                        render={props => <CustomerEvents  {...props} />}
                    />
                    <Route
                        path="/viewindividualdish/:id"
                        render={props => <IndividualDishDetails  {...props} />}
                    />
                    <Route
                        path="/allusers"
                        render={props => <AllCustomers  {...props} />}
                    />
                    <Route
                        path="/gotoconversations"
                        render={props => <ChatHistory {...props} />}
                    />
                    <Route
                        path="/chatpage/:id"
                        render={props => <ChatPage  {...props} />}
                    />
                    <Route
                    path="/otheruserprofile/:id"
                    render={props => <OtherUsersProfileDetails  {...props} />}
                />
                    <Route path="/home" component={Home} />
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
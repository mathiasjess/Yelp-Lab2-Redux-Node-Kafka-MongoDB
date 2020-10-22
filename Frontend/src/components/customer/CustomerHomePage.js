import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CustomerHomePage.css'
import yelp_brand from '../../images/yelp_brand.png'
import { connect } from 'react-redux';
import ProfileDetails from './Profile/ProfileDetails'


class CustomerHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchActiveFlag : '',
            searchParameter1 : '',
            searchParameter2 : '',
            props : {}
        }
        this.captureSearchParameters = this.captureSearchParameters.bind(this)
        this.searchRestaurant = this.searchRestaurant.bind(this)
    }
    componentDidMount(){
        this.setState({
            searchActiveFlag : false
        })
    }
    captureSearchParameters(event){
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    searchRestaurant(event){
        event.preventDefault();
        this.setState({
            searchActiveFlag : true,
            props : {
                searchParameter1 : this.state.searchParameter1,
                searchParameter2 : this.state.searchParameter2
            }
        })
    }

    render() {
        const searchactive = this.state.searchActiveFlag
        return (
            <div class="table">
                <div class="tr-top">
                <div class="td-top1">
                <img class = "yelp_logo"src = {yelp_brand} alt="Avatar" />
                </div>
                <div class="td-top2">
                <form class = "search-class">
                <input class="form-control mr-sm-6" name = "searchParameter1" type="text" onChange = {this.captureSearchParameters} placeholder="dish name, cuisine, location, zipcode or mode of delivery(Curb Pickup, Dine In or Yelp Delivery" aria-label="Search" />                {/*<button class="btn btn-outline-success my-2 my-sm-0" onClick = {this.searchRestaurant} type="submit">Search</button>*/}
                <button class= "btn btn-danger"><Link to ={{pathname : '/searchrestaurant', 
                                                                    aboutProps:
                                                                         {searchParameter1 : this.state.searchParameter1
                                                                        }}} class = "search-link">Search</Link></button>
                </form>
                </div>
                <div class="td-top3">
                </div>
                </div>
                {/* {searchactive? <SearchRestaurant {...this.state.props} />: <ProfileDetails />}*/}
                <ProfileDetails/>
            </div>

        )
    }

}
const mapStateToProps = state => ({
    user: state.customerReducer
});


export default connect(mapStateToProps)(CustomerHomePage);
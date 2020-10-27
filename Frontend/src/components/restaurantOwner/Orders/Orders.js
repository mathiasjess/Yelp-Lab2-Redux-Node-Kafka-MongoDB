import React from 'react'
import axios from 'axios'
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../Orders/orderhistory.css'
import Moment from 'react-moment';
import default_image from '../../../images/customer_default_pic.png'
import { restaurantLogin } from '../../../actions/restaurantAction'
import { customerLogin } from '../../../actions/customerAction'
import ReactPaginate from 'react-paginate';
import '../Paginate.css'

class RestaurantOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            // orderDetails: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            originalorderSummary: [],
            originalorderDetails: [],
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        }
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.fetchcustomerDetails = this.fetchcustomerDetails.bind(this)
    }
    async componentDidMount() {
    await axios.get(`http://localhost:3001/restaurantprofiledetailsroute/restaurantprofiledetails/${this.props.user._id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    this.props.restaurantLogin(response.data.data)
                    this.setState({
                        orderSummary: this.props.user.orders,
                        originalorderSummary: this.props.user.orders
                    })
                }
            })
            this.receivedData();
    }
    receivedData() {
        const slice = this.state.orderSummary.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(summary => <React.Fragment>
            <div>
                <div class="card-order">
                    <div class="order-header">
                        {summary.customerImage ? <img src={`/uploads/${summary.customerImage}`} alt="Avatar" class="photo-box" /> : <img class="photo-box" src={default_image} alt="Avatar" />}
                        < Link to={{
                            pathname: '/restaurantviewofcustomer',
                            aboutProps:
                            {
                                id: summary.customerID,
                            }
                        }} onClick={() => this.fetchcustomerDetails(summary.customerID)}>
                            <h5>{summary.customerName}</h5></Link>
                    </div>
                    <div class="order-footer">
                        <p><b>Date:</b> <Moment>{summary.Date}</Moment></p>
                        <p><b>Total Price:</b> {summary.totalPrice}</p>
                    </div>
                    <div class="order-footer">
                        <p><b>Delivery Option:</b> {summary.deliveryOption}</p>
                        <p><b>Status:</b> {summary.delivery_status}</p>
                        <p><b>Order Type:</b> {summary.deliveryFilter}</p>
                        <button class="btn btn-primary" onClick={() => this.updateOrder(summary._id)}>Update Order Status</button>
                    </div>
                </div>
            </div>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.orderSummary.length / this.state.perPage),

            postData
        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
    async handleFilters(deliveryFilter) {
        await this.setState({
            orderSummary: this.state.originalorderSummary.filter((summary) => {
                return summary.deliveryFilter === deliveryFilter
            })

        });
        console.log("Filtered Order Summary", this.state.orderSummary)
        this.receivedData();
    }

    async handleAllOrders() {
        await this.setState({
            orderSummary: this.state.originalorderSummary
        })
        this.receivedData();

    }
    updateOrder = (orderID) => {
        this.props.history.push(`/updateorder/${orderID}`)
    }
    async fetchcustomerDetails(id) {
        await axios.get(`http://localhost:3001/customerprofileroute/customerprofile/${id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    this.props.customerLogin(response.data.data[0])
                    console.log("Customer Details", response.data.data)
                }
            })
    }
    render() {
        console.log("orders", this.state.orderSummary)
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                        <ul>
                            <li><button class="no-show" onClick={() => { this.handleAllOrders() }}>All orders</button></li>
                        </ul>
                        <ul>
                            <h4 class="Filter-headings">Filters</h4>
                            <li><button class="no-show" onClick={() => this.handleFilters('New Order')}>New Order</button></li>
                            <li><button class="no-show" onClick={() => this.handleFilters('Delivered')}>Delivered</button></li>
                            <li> <button class="no-show" onClick={() => this.handleFilters('Cancelled Order')}>Cancelled Order</button></li>
                        </ul>
                    </div>
                    <div class="td-items2">
                        <h2> Orders</h2>
                        {this.state.postData}
                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});

function mapDispatchToProps(dispatch) {
    console.log("Dispatch", dispatch);
    return {
        restaurantLogin: (data) => dispatch(restaurantLogin(data)),
        customerLogin: (data) => dispatch(customerLogin(data))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantOrderHistory));
import React from 'react'
import axios from 'axios'
import './CustomerOrders.css'
import Popup from "reactjs-popup";
import { connect } from 'react-redux'
import Moment from 'react-moment';
import { customerOrderHistory } from '../../../actions/customerOtherDetailsAction'
import ReactPaginate from 'react-paginate';
import '../../restaurantOwner/Paginate.css' 


class CustomerOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        }
        this.orderdetails = this.orderdetails.bind(this)
        this.handlePickUp = this.handlePickUp.bind(this)
        this.handleDelivered = this.handleDelivered.bind(this)
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
    }
    async componentDidMount() {
        let OrderHistoryresult = []
        let individualOrder = {}
        await axios.get(`http://localhost:3001/customerordersroute/fetchcustomerordersummary/${this.props.user._id}`)
            .then(response => {
                console.log("Response of order history", response.data.data[0])
                if (response.data.message === "success") {
                    {response.data.data && response.data.data.map(order => {
                        order.orders.map(item => {
                            individualOrder = {
                                restaurantName: order.restaurantName,
                                restaurantImage: order.restaurantImage,
                                orderID: item._id,
                                totalPrice: item.totalPrice,
                                deliveryOption: item.deliveryOption,
                                delivery_status: item.delivery_status,
                                deliveryFilter: item.deliveryFilter,
                                orderDetails: item.orderDetails
                            }
                            OrderHistoryresult.push(individualOrder)
                            individualOrder = {}
                        })
                    })}
                    console.log("Refactored",OrderHistoryresult)
                    this.setState({
                        orderSummary : OrderHistoryresult
                    })
                    this.props.customerOrderHistory(OrderHistoryresult)
                    this.receivedData();
                }
                else {
                    alert("Could not fetch Customer Order History")
                }
            })
    }
    receivedData() {
        const slice = this.state.orderSummary.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(summary => <React.Fragment>
                <div class="card-order">
                    <h4>Restaurant: {summary.restaurantName}</h4>
                    <div class="order-footer">
                        <p><b>Date: </b><Moment>{summary.Date}</Moment></p>
                        <p><b>Total Price:</b> {summary.totalPrice}</p>
                    </div>
                    <div class="order-footer">
                        <p><b>Delivery Option:</b> {summary.deliveryOption}</p>
                        <p><b>Status:</b> {summary.delivery_status}</p>
                        <p><b>Order Type: </b> {summary.deliveryFilter}</p>
                        <button class="btn btn-primary" onClick={() => this.orderdetails(summary.orderID)}>View Details</button>
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
    orderdetails(orderID) {
        return this.props.history.push(`customerorderdetails/${orderID}`)
    }
    async handlePickUp() {
        this.setState({
            handlePickupFlag: true,
            handleDeliveredFlag: false
        })
        await this.setState({
            orderSummary: this.props.orderhistory.ordersummary.filter((summary) => {
                return summary.deliveryOption === 'pickup'
            })

        });
        this.receivedData();
    }
    async handleDelivered() {
        this.setState({
            handleDeliveredFlag: true,
            handlePickupFlag: false
        })
        await this.setState({
            orderSummary: this.props.orderhistory.ordersummary.filter((summary) => {
                return summary.deliveryOption === 'delivery'
            })

        });
        this.receivedData()
    }
    async handleFilters(deliveryOption, deliveryStatus) {
        await this.setState({
            orderSummary: this.props.orderhistory.ordersummary.filter((summary) => {
                return summary.deliveryOption === deliveryOption && summary.delivery_status === deliveryStatus
            })

        });
        this.receivedData()
    }   

    async handleAllOrders() {
     await this.setState({
            handleDeliveredFlag: false,
            handlePickupFlag: false,
            orderSummary: this.props.orderhistory.ordersummary
        })
        this.receivedData();
    }
    render() {
        console.log("From the store", this.props.orderhistory.ordersummary)
        let filters = null
        if (this.state.handlePickupFlag) {
            filters = (
                <ul>
                    <h4> Pick Up Filters</h4>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Preparing')}>Preparing</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('pickup', 'PickUp Ready')}>PickUp Ready</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Picked Up')}>Picked</button></li>

                </ul>
            );
        }
        else if (this.state.handleDeliveredFlag) {
            filters = (
                <ul>
                    <h4> Delivery Filters</h4>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Preparing')}>Preparing</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('delivery', 'On the way')}>On the Way</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Delivered')}>Delivered</button></li>
                </ul>
            )
        }
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                        <ul>
                            <li><button class="no-button-show" onClick={() => { this.handleAllOrders() }}><span class="glyphicon glyphicon-th-list" />All orders</button></li>
                        </ul>
                        <h3 style={{ textAlign: 'center' }}> Filters</h3>
                        <ul>
                            <li> <button class="no-button-show" onClick={() => { this.handlePickUp() }}>Pickup</button></li>
                            <li> <button class="no-button-show" onClick={() => { this.handleDelivered() }}>Delivered</button></li>
                        </ul>
                        {filters}
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
    user: state.customerReducer,
    orderhistory: state.customerOtherDetailsReducer
});

function mapDispatchToProps(dispatch) {
    return {
        customerOrderHistory: (data) => dispatch(customerOrderHistory(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderHistory);
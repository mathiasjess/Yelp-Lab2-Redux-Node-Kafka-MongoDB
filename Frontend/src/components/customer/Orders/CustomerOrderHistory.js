import React from 'react'
import axios from 'axios'
import './CustomerOrders.css'
import Popup from "reactjs-popup";
import { connect } from 'react-redux'
import Moment from 'react-moment';


class CustomerOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            originalorderSummary: [],
            originalorderDetails: []
        }
        this.orderdetails = this.orderdetails.bind(this)
        this.handlePickUp = this.handlePickUp.bind(this)
        this.handleDelivered = this.handleDelivered.bind(this)
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
    }
    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/orders/fetchcustomerordersummary/${this.props.user.id}`),
            axios.get(`http://localhost:3001/orders/fetchcustomerorderdetails/${this.props.user.id}`)
        ])
            .then(axios.spread((response1, response2) => {
                this.setState({
                    orderSummary: response1.data.data,
                    orderDetails: response2.data.data,
                    originalorderSummary: response1.data.data,
                    originalorderDetails: response2.data.data,
                })
            }))

    }
    orderdetails(orderID) {
         return this.props.history.push(`customerorderdetails/${orderID}`)
    }
    handlePickUp() {
        this.setState({
            handlePickupFlag: true,
            handleDeliveredFlag: false
        })
        this.setState({
            orderSummary: this.state.originalorderSummary.filter((summary) => {
                return summary.deliveryOption === 'pickup'
            })

        });
    }
    handleDelivered() {
        this.setState({
            handleDeliveredFlag: true,
            handlePickupFlag: false
        })
        this.setState({
            orderSummary: this.state.originalorderSummary.filter((summary) => {
                return summary.deliveryOption === 'delivery'
            })

        });
    }
    handleFilters(deliveryOption, deliveryStatus){
        this.setState({
            orderSummary: this.state.originalorderSummary.filter((summary) => {
                return summary.deliveryOption === deliveryOption && summary.delivery_status === deliveryStatus
            })

        }); 
    }

    handleAllOrders(){
        this.setState({
            handleDeliveredFlag: false,
            handlePickupFlag:false,
            orderSummary: this.state.originalorderSummary
            }) 
    }
    render() {
        let filters = null
        if (this.state.handlePickupFlag) {
            filters = (
                <ul>
                <h4> Pick Up Filters</h4>
                    <li><button class= "no-button-show" onClick={()=>this.handleFilters('pickup', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class= "no-button-show" onClick={()=>this.handleFilters('pickup', 'Preparing')}>Preparing</button></li>
                    <li> <button class= "no-button-show" onClick={()=>this.handleFilters('pickup', 'PickUp Ready')}>PickUp Ready</button></li>
                    <li> <button class= "no-button-show" onClick={()=>this.handleFilters('pickup', 'Picked Up')}>Picked</button></li>

                </ul>
            );
        }
        else if (this.state.handleDeliveredFlag) {
            filters = (
                <ul>
                <h4> Delivery Filters</h4>
                    <li><button class= "no-button-show" onClick={()=>this.handleFilters('delivery', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class= "no-button-show" onClick={()=>this.handleFilters('delivery', 'Preparing')}>Preparing</button></li>
                    <li> <button  class= "no-button-show" onClick={()=>this.handleFilters('delivery', 'On the way')}>On the Way</button></li>
                    <li> <button class= "no-button-show" onClick={()=>this.handleFilters('delivery', 'Delivered')}>Delivered</button></li>
                </ul>
            )
        }
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                    <ul>
                    <li><button class="no-button-show" onClick={() => { this.handleAllOrders() }}><span class="glyphicon glyphicon-th-list"/>All orders</button></li>
                    </ul>
                        <h3 style = {{textAlign: 'center'}}> Filters</h3>
                        <ul>
                            <li> <button class= "no-button-show" onClick={() => { this.handlePickUp() }}>Pickup</button></li>
                            <li> <button class= "no-button-show" onClick={() => { this.handleDelivered() }}>Delivered</button></li>
                        </ul>
                        {filters}
                    </div>
                    <div class="td-items2">
                    <h2> Orders</h2>
                        {this.state.orderSummary.map((summary, i) => {
                            return (
                                <div class="card-order" key={i}>
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
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});

export default connect(mapStateToProps)(CustomerOrderHistory);
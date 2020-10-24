import React from 'react'
import axios from 'axios'
import default_pic from '../../../images/restaurantprofileImage.png'
import './CustomerOrders.css'
import { connect } from 'react-redux'
import { addToCart, addItem, removeItem, removecart } from '../../../actions/cartActions'
import { Link } from 'react-router-dom';

class CustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            restaurantID: '',
            customerID: '',
            orderID: '',
            completeOrderFlag: false,
            takeOutValue : '',

        }
        this.addtoCart = this.handleAddToCart.bind(this)
        this.handleAddquantity = this.handleAddquantity.bind(this)
        this.handleremovequantity = this.handleremovequantity.bind(this)
        this.handleTakeOutChange = this.handleTakeOutChange.bind(this)
        this.completeOrder = this.completeOrder.bind(this)
        this.CancelOrder = this.CancelOrder.bind(this)
        this.viewDetails = this.viewDetails.bind(this)
    }
    componentDidMount() {
        this.setState({
            restaurantID: this.props.match.params.id,
            customerID: this.props.user.id,

        })
        axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.match.params.id}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {

                    this.setState({
                        items: response.data.data
                    })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }
    viewDetails(menuId){
        return this.props.history.push(`/viewindividualdish/${menuId}/${this.props.match.params.id}`)
    }
    handleAddToCart(itemID, dishName, price) {
        let Orderdata = {
            orderID: this.state.orderID,
            itemID: itemID,
            dishName: dishName,
            price: price

        }
        console.log(Orderdata)
        this.props.addToCart(Orderdata)
    }

    handleAddquantity(itemID) {
        this.props.addItem(itemID)
    }

    handleremovequantity(itemID) {
        this.props.removeItem(itemID)
    }
    handleTakeOutChange(event){
        event.preventDefault();
        this.setState({
            takeOutValue : event.target.value
        })
    }
    completeOrder(restaurantId) {
        console.log("Take Out value", this.state.takeOutValue)
        let OrderDetails = {
            customerID: this.props.user.id,
            restaurantID: restaurantId,
            total_price: this.props.cartItems.total,
            delivery_option: this.state.takeOutValue,
            delivery_status: 'Order Recieved',
            deliveryFilter: 'New Order'
        }
        // let formData= new FormData()
        // formData.append('data',JSON.stringify())
        axios.post('http://localhost:3001/orders/sendordersummary', OrderDetails)
            .then(response => {
                if (response.data.message === "success") {
                    axios.post(`http://localhost:3001/orders/sendorderdetails/${response.data.data}`, this.props.cartItems.addedItems)
                        .then(response => {
                            if (response.data.message === "success") {
                                alert('Placed order successfully')
                                this.props.removecart()
                                this.props.history.push(`/customerorderhistory`)
                            }
                            else {
                                console.log('Could not complete order')
                                this.props.history.push(`/customerhomepage/${this.props.user.id}`)
                                
                            }
                        })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong")
                    this.props.removecart()
                }
            })
    }

    CancelOrder(restaurantID) {
        this.props.removecart()
        this.props.history.push(`/restauranthomepage/${this.props.user.id}`)
    }

    render() {
        let addedItems = null
        if (this.props.cartItems.addedItems) {
            addedItems = (
                this.props.cartItems.addedItems.map(item => {
                    return (
                        <tr>
                            <td>{item.dishName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td><button class="btn btn-primary" onClick={() => this.handleAddquantity(item.itemID)}><span class="glyphicon glyphicon-plus"></span></button></td>
                            <td><button class="btn btn-primary" onClick={() => this.handleremovequantity(item.itemID)}><span class="glyphicon glyphicon-minus"></span></button></td>
                        </tr>
                    )
                })
            )
        }


        return (
            <div class="table">
                <div class="tr-items">

                    <div class="td-items1">
                    </div>
                    <div class="td-items2">
                    <button class = "btn btn-primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}> Go Back to Restaurant Page</button>
                        <h2>Order Food from our Menu</h2>
                        <div class="flex-display-items">
                            {this.state.items.map((menu, i) => {
                                return <div class="card1" key={i}>
                                <img src={`/uploads/${menu.dishImage1}`} alt="Avatar" class="card-img-top-items" alt="Card image cap" />
                                    <div class="container-order-menu">
                                        <p style={{textAlign:'left'}}><b> Dish Name: </b>{menu.dishName}</p>
                                        <p style={{textAlign:'left'}}><b>Price: </b>{menu.price}</p>
                                        <button class="btn btn-primary" value={menu.itemID} onClick={() => this.viewDetails(menu.itemID)}>View Details</button>
                                        <button class="btn btn-primary" value={menu.itemID} onClick={() => this.handleAddToCart(menu.itemID, menu.dishName, menu.price)}>Add to Cart</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div class="td-items3">
                        {this.props.cartItems.addedItems ?
                            <div>
                                <h2> Order Details</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Dish Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Add</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addedItems}
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th colSpan="5">Total : {this.props.cartItems.total ? this.props.cartItems.total : null}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <form>
                                <label>Select Takeout Option</label>
                                    <select onChange={this.handleTakeOutChange}>
                                    <option> Select a value</option>
                                    <option value = "pickup">Pick Up</option>
                                    <option value = "delivery">Delivery</option>
                                    </select>
                                </form>
                                <button class="btn btn-danger" onClick={() => this.completeOrder(this.props.match.params.id)}>Complete Order</button>
                                <button class="btn btn-danger" onClick={() => this.CancelOrder(this.props.match.params.id)}>Cancel Order</button>
                                {this.state.completeOrderFlag && <div>

                                </div>}
                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cartItems: state.cartReducer,
    user: state.customerReducer
});

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        addItem: (id) => dispatch(addItem(id)),
        removeItem: (id) => dispatch(removeItem(id)),
        removecart: () => dispatch(removecart())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders)
import React from 'react'
import '../../restaurantOwner/RestaurantHomePage.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

class IndividualDishDetailsC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemID: this.props.match.params.id,
            dishName: '',
            dishIngredients: '',
            dishDescription: '',
            dishImag1: '',
            dishImage2: '',
            dishImage3: '',
            dishImage4: '',
            price: '',
            dishCategory: '',
            dishData: []
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:3001/restaurant/fetchdish/${this.props.match.params.menuId}`)
            // axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.user.restaurantId}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    response.data.data.map((dish) => {
                        return this.setState({
                            itemID: this.props.match.params.id,
                            dishName: dish.dishName,
                            dishIngredients: dish.dishIngredients,
                            dishDescription: dish.dishDescription,
                            dishImage1: dish.dishImage1,
                            dishImage2: dish.dishImage2,
                            dishImage3: dish.dishImage3,
                            dishImage4: dish.dishImage4,
                            price: dish.price,
                            dishCategory: dish.dishCategory,
                        })
                    })
                }
            })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div>
                    <div class="main-link">
                    <button class="btn btn-primary" onClick = {()=> this.props.history.push(`/customerorder/${this.props.match.params.restId}`)}>Back to Orders Page</button>
                    </div>
                    <h2 style={{ textAlign: 'center' }}> Dish Details</h2>
                    <div class="card-order">
                        <h5>{this.state.dishName}</h5>
                        <h6>Category: {this.state.dishCategory}</h6>
                        <img src={`/uploads/${this.state.dishImage1}`} alt="Avatar" class="photo-box-dish" />
                        <img src={`/uploads/${this.state.dishImage2}`} alt="Avatar" class="photo-box-dish" />
                        <img src={`/uploads/${this.state.dishImage3}`} alt="Avatar" class="photo-box-dish" />
                        <img src={`/uploads/${this.state.dishImage4}`} alt="Avatar" class="photo-box-dish" />
                        <p style={{lineHeight:'3rem'}}><b>Description: </b>{this.state.dishDescription}</p>
                        <p style={{lineHeight:'3rem'}}><b>Ingredients:</b> {this.state.dishIngredients}</p>
                        <p style={{lineHeight:'3rem'}}><b>Price:</b> ${this.state.price}</p>
                    </div>
                </div>
            </div>
        )
    }

}


export default IndividualDishDetailsC;
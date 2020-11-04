import React from 'react'
import { connect } from 'react-redux';
import '../../restaurantOwner/RestaurantHomePage.css';
import { Link } from 'react-router-dom'
import { imagepath } from '../../../config/imagepath';

class DishDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dishDetails: []
        }
    }
    componentDidMount() {
        console.log("Menu Items", this.props.user.menuItem)
        console.log("ID", this.props.match.params.id)
        this.props.user.menuItem.map(menu => {
            if (menu._id === this.props.match.params.id) {
                return this.setState({
                    dishDetails: menu
                })
            }
        })
    }
    render() {
        console.log("Dish details", this.state.dishDetails)
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="main-link">
                    <Link to="#" onClick={()=>{this.props.history.push(`/customerorder/${this.props.user._id}`)}}><span class="glyphicon glyphicon-arrow-left" />Return to Restaurant Profile</Link>
                </div>
                    <h2 style={{ textAlign: 'center' }}> Dish Details</h2>
                    <div class="card-order">
                        <h5>{this.state.dishDetails.dishName}</h5>
                        <h6>Category: {this.state.dishDetails.dishCategory}</h6>
                        {this.state.dishDetails.dishImages && this.state.dishDetails.dishImages.map(function(image){
                            return <img src={imagepath+`${image}`} alt="Avatar" class="photo-box-dish" />
                        })}
                        <p style={{lineHeight:'3rem'}}><b>Description: </b>{this.state.dishDetails.dishDescription}</p>
                        <p style={{lineHeight:'3rem'}}><b>Ingredients:</b> {this.state.dishDetails.dishIngredients}</p>
                        <p style={{lineHeight:'3rem'}}><b>Price:</b> ${this.state.dishDetails.price}</p>
                    </div>
                </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(DishDetails);
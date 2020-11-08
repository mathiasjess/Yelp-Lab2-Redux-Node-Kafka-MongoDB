import React from 'react'
import '../RestaurantHomePage.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { restaurantDishAdd } from '../../../actions/restaurantAction';
import { rooturl } from '../../../config/settings';


class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: '',
            dishIngredients: '',
            dishDescription: '',
            fetchedImages: '',
            dishImages: '',
            dishImage1: '',
            dishImage2: '',
            dishImage3: '',
            dishImage4: '',
            price: '',
            dishCategory: 'Appetizer'
        }
        this.handleMenuChange = this.handleMenuChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.updateMenu = this.updateMenu.bind(this)

    }
    handleMenuChange(event) {
        event.preventDefault();
        event.target.type === "file" ? this.setState({ [event.target.name]: event.target.files }) : this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCategoryChange(event) {
        event.preventDefault();
        this.setState({
            dishCategory: event.target.value
        })
    }
    // async uploadPics() {
    //     const data = new FormData()
    //     for (var x = 0; x < this.state.dishImages.length; x++) {
    //         data.append('file', this.state.dishImages[x])
    //     }
    //     axios.post(rooturl+'/restaurantmenuroute/uploadpics', data)
    //         .then(res => { // then print response status
    //             if (res.data.message === "success") {
    //                 console.log("Image names", res.data.data)
    //                 this.setState({
    //                     fetchedImages: res.data.data
    //                 })
    //             }
    //         })
    // }

    updateMenu(event) {
        event.preventDefault();
        const data = new FormData()
        for (var x = 0; x < this.state.dishImages.length; x++) {
            data.append('file', this.state.dishImages[x])
        }
        axios.post(rooturl+'/restaurantmenuroute/uploadpics', data)
            .then(res => { // then print response status
                if (res.data.message === "success") {
                    console.log("Image names", res.data.data)
                    // this.setState({
                    //     fetchedImages : res.data.data
                    // })
                    let data = {
                        restaurantId: this.props.user._id,
                        dishName: this.state.dishName,
                        dishIngredients: this.state.dishIngredients,
                        dishDescription: this.state.dishDescription,
                        dishImages: res.data.data,
                        price: this.state.price,
                        dishCategory: this.state.dishCategory
                    }
                    console.log(data)
                    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
                    axios.post(rooturl+'/restaurantmenuroute/updateMenu', data)
                        .then(response => {
                            // console.log(response.data.data.data.menuItem)
                            console.log("Response",response.data.data.message)
                            if (response.data.data.message === "success") {
                                console.log(response.data.data.data[0].menuItem[0])
                                alert('Added Dish to Menu')
                                this.props.restaurantDishAdd(response.data.data.data[0].menuItem[0])
                                this.props.history.push(`/restauranthomepage/${this.props.user._id}`);
                            }
                            else if (response.data.data.message === "error") {
                                alert("Something Went wrong. Could not add dish. Please try again")
                                this.props.history.push(`/restauranthomepage/${this.props.user._id}`);
                            }
                        })
                }
            })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Add dishes to your restaurant</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">Dish Images</label></li>
                                <li><input type="file"
                                    name="dishImages"
                                    id='dishImages'
                                    onChange={this.handleMenuChange}
                                    class="inputFields" multiple /></li>
                                {/*<li><button type="submit" class="ybtn ybtn--primary" onClick={this.uploadPics}><span>Upload dish Images</span></button></li>*/}

                                <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                                <li>
                                    <select value={this.state.dishCategory} onChange={this.handleCategoryChange} >
                                        <option value="Appetizer">Appetizer</option>
                                        <option value="Salads">Salads</option>
                                        <option value="MainCourse">Main Course</option>
                                        <option value="Deserts">Deserts</option>
                                        <option value="Beverages">Beverages</option>
                                    </select>
                                </li>
                                <li class="BusinessName"><label class="u-nowrap">Dish Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleMenuChange}
                                    name="dishName"
                                    placeholder="Dish Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Main Ingredients</label></li>
                                <li><textarea class="inputFields"
                                    placeholder="Enter the Ingredients here"
                                    name="dishIngredients" rows="4" cols="50"
                                    onChange={this.handleMenuChange}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Description of the Dish</label></li>
                                <li><textarea class="inputFields"
                                    placeholder="Enter the description here"
                                    name="dishDescription" rows="4" cols="50"
                                    onChange={this.handleMenuChange}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Price</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleMenuChange}
                                    name="price" /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="SubmitUpdate">
                        <button type="submit" class="ybtn ybtn--primary" onClick={this.updateMenu}><span>Add Dish</span></button>
                        <Link to="#" >Cancel</Link>
                    </div>
                </form>
                <img src={this.state.dishImage1} alt="Dish Image" />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

function mapDispatchToProps(dispatch) {
    return {
        restaurantDishAdd: (data) => dispatch(restaurantDishAdd(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
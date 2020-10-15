import React from 'react'
import './RestaurantHomePage.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link,  withRouter } from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: '',
            dishIngredients: '',
            dishDescription: '',
            fetchedImages :'',
            dishImages : '',
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
        this.uploadPics = this.uploadPics.bind(this)

    }
    handleMenuChange(event) {
        event.preventDefault();
        event.target.type === "file" ? this.setState({[event.target.name]: event.target.files}) : this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCategoryChange(event){
        event.preventDefault();
        this.setState({
            dishCategory : event.target.value
        })
    }
    uploadPics(event){
        event.preventDefault();
        const data = new FormData()
        for(var x = 0; x<this.state.dishImages.length; x++) {
            data.append('file', this.state.dishImages[x])
        }
        axios.post('http://localhost:3001/restaurantmenu/uploadpics', data)
        .then(res => { // then print response status
            if(res.data.message === "success"){
                console.log("Image names", res.data.data)
                this.setState({
                    fetchedImages : res.data.data
                })
                alert("Uploaded Images for dish")
            }
         })
    }

    updateMenu(event) {
        event.preventDefault();
        console.log(this.state.dishImage1, this.state.dishImage2, this.state.dishImage3, this.state.dishImage4)
        let data = {
            restaurantId :this.props.user.restaurantId,
            dishName: this.state.dishName,
            dishIngredients: this.state.dishIngredients,
            dishDescription: this.state.dishDescription,
            dishImage1: this.state.fetchedImages[0] ? this.state.fetchedImages[0]: null,
            dishImage2: this.state.fetchedImages[1] ? this.state.fetchedImages[1]: null,
            dishImage3: this.state.fetchedImages[2] ? this.state.fetchedImages[2]: null,
            dishImage4: this.state.fetchedImages[3] ? this.state.fetchedImages[3]: null,
            price: this.state.price,
            dishCategory: this.state.dishCategory
        }
        console.log(data)
        axios.post('http://localhost:3001/restaurantmenu/updateMenu', data)
            .then(response => {
                if (response.data.message === "success") {
                    console.log("The data got is", response.data)
                    // console.log('Getting Cookie ID', Cookies.get('id'))
                    alert('Added Dish to Menu')
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                }
                else if (response.data.message === "error") {
                    alert("Something Went wrong. Could not add dish. Please try again")
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
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
                        <li class="BusinessName"><label class="u-nowrap">Dish Image 1</label></li>
                        <li><input type="file"
                            name="dishImages"
                            id = 'dishImages'
                            onChange={this.handleMenuChange}
                            class="inputFields" multiple/></li> 
                            <li><button type="submit" class="ybtn ybtn--primary" onClick={this.uploadPics}><span>Upload dish Images</span></button></li>
                        
                            <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                            <li>
                                <select value={this.state.dishCategory}  onChange={this.handleCategoryChange} >
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
            <img src = {this.state.dishImage1} alt="Dish Image" />
        </div>
    )
}

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default withRouter(connect(mapStateToProps)(Menu));
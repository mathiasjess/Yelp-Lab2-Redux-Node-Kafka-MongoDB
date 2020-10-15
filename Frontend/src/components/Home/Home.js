import React, { Component } from 'react';
import '../../App.css';
import MainContent from '../LandingPage/MainContent'
import Main from '../Main';

class Home extends React.Component {
    constructor() {
        super();
        }
    render() {
        return (
            <div class="landingPageSearchContainer">
                <div class="landingPageSearch">
                    <label for="gsearch">Find</label>
                    <input type="search" id="gsearch" name="restaurantName" placeholder="Enter restaurant name" />
                    <input type="search" id="gsearch" name="zipCode" placeholder="Enter Zip Code" />
                    <input type="submit" />
                </div>

            </div>

        )
    }
}
//export Home Component
export default Home;
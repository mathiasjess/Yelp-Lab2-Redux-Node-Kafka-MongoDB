import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './reviews.css'
import default_image from '../../../images/customer_default_pic.png'
import ReactPaginate from 'react-paginate';
import '../Paginate.css'
import Moment from 'react-moment';

class CustomerReviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        };
    }
    componentDidMount() {
        this.receivedData()
    }
    receivedData() {
        const data = this.props.user.reviews;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(review => <React.Fragment>
            <div class="Reviews">
                <h4>Rating: {review.ratings}/5</h4>
                <div class="review-header">
                    {review.customerImage ? <img src={`/uploads/${review.customerImage}`} alt="Avatar" class="photo-box" /> : <img class="photo-box" src={default_image} alt="Avatar" />}
                    <Link to={{
                        pathname: '/restaurantviewofcustomer',
                        aboutProps: { id: review.customerID }
                    }}><h5>{review.customerName}</h5></Link>
                </div>
                <h6>Date: <Moment>{review.reviewDate}</Moment></h6>
                <h6>Comments:{review.comments}</h6>
            </div>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

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
    render() {
        return (
            <div class="container">
            <h2 style={{ textAlign: 'center' }}>Reviews</h2>
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
                activeClassName={"active"}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(CustomerReviews);
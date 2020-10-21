import React from 'react'
import '../RestaurantHomePage.css'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import '../Paginate.css'



class DisplayMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.viewDish = this.viewDish.bind(this)
    }
    viewDish(ID) {
        this.props.history.replace(`/dishdetails/${ID}`);
    }

    componentDidMount() {
        this.receivedData()
    }


    receivedData() {
        const data = this.props.user.menuItem;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(menu => <React.Fragment>
            <div class="card-menu">
                <div class="card-items">
                    <h5 style={{ textAlign: 'center', lineHeight: '2rem' }}><b>{menu.dishName}</b></h5>
                    <img src={`/uploads/${menu.dishImages[0]}`} alt="Avatar" class="card-img-top-menu" />
                    <p style={{ lineHeight: '2rem' }}><b><span class="glyphicon glyphicon-th-list"></span>Category: </b> {menu.dishCategory}</p>
                    <p><b>Description: </b>{menu.dishDescription}</p>
                    <p><b>{menu.price}</b></p>
                </div>
                <button class="btn btn-primary" value={menu._id} onClick={() => this.viewDish(menu._id)}>View Details</button>
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
            <div class="menu">
                <h2 style={{ textAlign: 'center' }}>Menu Page</h2>
                <div class="flex-display-items">
                    {this.state.postData}
                </div>
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


export default connect(mapStateToProps)(DisplayMenu);
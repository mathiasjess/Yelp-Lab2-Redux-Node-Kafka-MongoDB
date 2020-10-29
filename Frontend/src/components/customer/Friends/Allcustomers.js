import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Route, Link, withRouter } from 'react-router-dom';
import './Allcustomers.css'
import ReactPaginate from 'react-paginate';
import '../../restaurantOwner/Paginate.css'
import { yelpusers } from '../../../actions/customerOtherDetailsAction'

class AllCustomers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
            registryList: [],
            searchParameter: '',
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.gotouserprofile = this.gotouserprofile.bind(this);
        this.captureSearchParameters = this.captureSearchParameters.bind(this);
        this.handleusersearch = this.handleusersearch.bind(this);
        this.handleFilters = this.handleFilters.bind(this)
    }
    async componentDidMount() {
        await axios.get('http://localhost:3001/allcustomersroute/allusers')
            .then(response => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    this.props.yelpusers(response.data.data);
                    this.setState({
                        data: this.props.allusers.yelpusers
                    })
                    this.receivedData()
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong")
                }
            })
    }
    handleFilters(filter) {
        let mainID = localStorage.getItem('id')
        if (filter === 'allusers') {
            this.setState({
                data: this.props.allusers.yelpusers
            })
        }
        else if (filter === 'location') {
            this.setState({
                data: this.state.searchResults.filter((result) => {
                    return result.zipcode === localStorage.getItem('zipcode');
                })
            })
        }
        else if (filter === 'following') {
            axios.get(`http://localhost:3001/allcustomersroute/following/${mainID}`)
                .then(response => {
                    if (response.data.message === "success") {
                        this.setState({
                            data: response.data.data
                        })
                    }
                    else if (response.data.message === "error") {
                        alert("Something went wrong")
                    }
                })
        }
    }
    captureSearchParameters(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async handleusersearch() {
        // event.preventDefault();
        console.log("Search", this.state.searchParameter)
        await this.props.allusers.yelpusers.map(user => {
            if (user.firstName === this.state.searchParameter || user.nickName === this.state.searchParameter) {
                this.setState({
                    data: [user]

                })
            }
        })
        this.receivedData()
    }
    gotouserprofile(customerId) {
        this.props.history.replace(`/customerhomepage/${customerId}`);
    }
    receivedData() {
        console.log("Data", this.state.data)
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(customer => <React.Fragment>
            <tr>
                <td style={{ textAlign: 'center' }}><Link to="#" onClick={() => this.gotouserprofile(customer._id)}>
                    {customer.firstName + ' ' + customer.lastName}</Link></td>
            </tr>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.data.length / this.state.perPage),

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
        let count = 0
        return (
            <div>
                <div class="leftside">
                    <ul>
                        <h4>Filters</h4>
                        <li> <button class="no-button-show" onClick={() => this.handleFilters('allusers')}>All users</button></li>
                        <li><button class="no-button-show" onClick={() => this.handleFilters('location')}>Location</button></li>
                        <li><button class="no-button-show" onClick={() => this.handleFilters('following')}>Following</button></li>

                    </ul>
                </div>
                <div class="rightside">
                    <div class="searchuser">
                        <form class="searchuserclass">
                            <input class="form-control mr-sm-2" name="searchParameter" type="text" onChange={this.captureSearchParameters} placeholder="User Name or Nick Name" aria-label="Search" />
                            <button class="btn btn-danger"><Link to="#" style={{ color: "white" }} onClick={() => this.handleusersearch()}>search</Link></button>
                        </form>
                    </div>
                    <div>
                        <table class="table-users-list">
                            <tr>
                                <th><h2 style={{ textAlign: 'center' }}>List of Yelp Users</h2></th>
                            </tr>
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
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.restaurantReducer,
    allusers: state.customerOtherDetailsReducer
});
function mapDispatchToProps(dispatch) {
    console.log("Dispatch", dispatch);
    return {
        yelpusers: (data) => dispatch(yelpusers(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllCustomers);
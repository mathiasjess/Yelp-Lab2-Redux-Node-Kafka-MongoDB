import React from 'react'
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import './EventList.css'
import ReactPaginate from 'react-paginate';
import '../Paginate.css'

class EventList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
            registryList: [],
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    async componentDidMount() {
        console.log("Event ID",this.props.match.params.id)
        await this.props.user.events.map(event => {
            if (event._id === this.props.match.params.id) {
                this.setState({
                    data:event.registeredUsers
                })
            }
        })
        this.receivedData()
    }
    receivedData() {
        let count = 0
        console.log("Data", this.state.data)
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(customer => <React.Fragment>
            <tr>
                <td>{count = count + 1}</td>
                <td><Link to={{
                    pathname: '/restaurantviewofcustomer',
                    aboutProps: { id: customer.customerID }
                }}>
                    {customer.customerName}</Link></td>
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
                <div style={{ padding: "10px" }}>
                    <Link to="/displayevents"><span class="glyphicon glyphicon-arrow-left" />Return to Main Events Page</Link>
                </div>
                <h2 style={{ textAlign: 'center' }}> List of Users Registered for Event</h2>
                <table class="table-event-list">
                    <tr>
                        <th>Sl No.</th>
                        <th>Customer Name</th>
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
        )
    }

}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(EventList);
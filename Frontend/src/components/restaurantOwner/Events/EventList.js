import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { Route, Link , withRouter} from 'react-router-dom';
import './EventList.css'

class EventList extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            registryList : []
        }
    }
    componentDidMount(){
        this.props.user.events.map(event=>{
            if(event._id === this.props.match.params.id){
                return this.setState({
                    registryList : event.registeredUsers
                })
            }
        })
    }
    render(){
        let count = 0
        return(
            <div>
            <h2 style ={{textAlign: 'center'}}> List of Users Registered for Event</h2>
            <table class="table-event-list">
            <tr>
            <th>Sl No.</th>
            <th>Customer Name</th>
            </tr>
            {this.state.registryList.length == 1 && 
                <tr>
                <td>{count = count + 1}</td>
                <td><Link to= {{pathname: '/restaurantviewofcustomer',
                            aboutProps:{id: this.state.registryList[0].customerID}}}>
                            {this.state.registryList[0].customerName}</Link></td>
                </tr>}
            {this.state.registryList.length > 1 && this.state.registryList.map((customer, i)=>{
                <tr key = {i}>
                <td>{count = count + 1}</td>
                <td><Link to= {{pathname: '/restaurantviewofcustomer',
                            aboutProps:{id: customer.customerID}}}>
                            {customer.customerName}</Link></td>
                </tr>
            })}
            </table>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(EventList);
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
        axios.get(`http://localhost:3001/restaurantevents/fetchregistry/${this.props.match.params.id}`)
        .then(response=>{
            if(response.data.message === "success"){
                console.log(response.data.data)
                this.setState({
                    registryList :response.data.data
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
                            aboutProps:{id: this.state.registryList[0].id}}}>
                            {this.state.registryList[0].firstName} {this.state.registryList[0].lastName}</Link></td>
                </tr>}
            {this.state.registryList.length > 1 && this.state.registryList.map((customer, i)=>{
                <tr key = {i}>
                <td>{count = count + 1}</td>
                <td><Link to= {{pathname: '/restaurantviewofcustomer',
                            aboutProps:{id: customer.id}}}>
                            {customer.firstName} {customer.lastName}</Link></td>
                </tr>
            })}
            </table>
            </div>
        )
    }

}
export default EventList
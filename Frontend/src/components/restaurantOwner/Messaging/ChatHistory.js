import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'
import './Chat.css'
import { rooturl } from '../../../config/settings';


class ChatHistory extends React.Component {
    constructor() {
        super()
        this.state = {
            chatdetails: []
        }
    }
    async componentDidMount() {
        const id = localStorage.getItem('id')
        console.log('id', id)
        let url = null
        let uniqueuser = []
        if (localStorage.getItem('role') === 'restaurant') {
            url = rooturl+`/chatroutes/getrestaurantconversations/${id}`
        }
        else if (localStorage.getItem('role') === 'customer') {
            url = rooturl+`/chatroutes/getcustomerconversations/${id}`
        }
        await axios.get(url)
            .then(response => {
                if (response.data.data.message === "success") {
                    if (localStorage.getItem('role') === 'customer'){
                        console.log("Customer Data", response.data.data.data)
                        this.setState({
                            chatdetails: response.data.data.data.filter((value, index, self) => self.map(x => x.restaurantId).indexOf(value.restaurantId) == index)
                        })
                    }
                    if (localStorage.getItem('role') === 'restaurant') {
                        this.setState({
                            chatdetails: response.data.data.data.filter((value, index, self) => self.map(x => x.customerId).indexOf(value.customerId) == index)
                        })
                    }
                }
            })
    }
    renderChatHistory() {
        return this.state.chatdetails.map((item, index) => {
            console.log(item);
            console.log(item.sender);
            console.log(item.chatMessage);
            return (
                <div class="Chats">
                    {localStorage.getItem('role') === 'restaurant'?
                     <h4>From: <Link to = "#" onClick = {()=>this.props.history.replace(`/chatpage/${item.customerId}`)}>{item.sender}</Link></h4>:
                     <h4>From: <Link to = "#" onClick = {()=>this.props.history.replace(`/chatpage/${item.restaurantId}`)}>{item.sender}</Link></h4>}
                    <div class="Chat-header">
                        <p><b>Message: </b>{item.chatMessage}</p>
                        <p>{moment(item.nowtime).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            )
        })

    }
    render() {
        return (
            <div className="chatHistorycontainer">
                <h2 style={{ textAlign: "center" }}> Chat History</h2>
                {this.state.chatdetails && (this.renderChatHistory())}
            </div>
        )
    }

}

export default ChatHistory
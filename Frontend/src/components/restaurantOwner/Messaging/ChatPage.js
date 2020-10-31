import React from 'react'
import { Form, Input, Button, Row, Col, } from 'antd';
import Icon from '@ant-design/icons';
import io from 'socket.io-client';
import { connect } from "react-redux";
import  moment  from "moment";
import axios from 'axios'
import './Chat.css'
import {setChats, getChats} from '../../../actions/ChatActions'
import ChatCard from './ChatCard'

class ChatPage extends React.Component{
constructor(){
    super()
    this.state={
        chatMessage : "",
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.submitChatMessage = this.submitChatMessage.bind(this)
    this.renderCards = this.renderCards.bind(this)
}
componentDidMount(){
    axios.get("http://localhost:3001/chatroutes/getchats", { params: [this.props.restaurant._id,this.props.user._id] })
    .then(response =>{
        if(response.data.message === "error"){
            alert("Could not fetch Chat history")
        }
        else if (response.data.message === "success"){
            this.props.getChats(response.data.data)

        }
    })

    let server = "http://localhost:3001"
    this.socket = io(server);
}

handleSearchChange = (e) => {
    this.setState({
        chatMessage : e.target.value
    })

}
renderCards=(chats)=>{
    return chats.map((item, index) => {
        console.log(item);
        console.log(item.sender);
        console.log(item.chatMessage);
        return (
            <ChatCard key = {item._id} {...item}/>
        )
        })
}

submitChatMessage = (e)=>{
    e.preventDefault();
    let customerId = this.props.user._id
    let sender = localStorage.getItem('name')
    let restaurantId = this.props.restaurant._id
    let chatMessage = this.state.chatMessage
    let nowtime = moment();

    this.socket.emit("Input Chat Message", {
        customerId,
        sender,
        restaurantId,
        chatMessage,
        nowtime
    });
    this.socket.on("Output Chat Message", messageFromBackend =>{
        this.props.setChats(messageFromBackend[0])
    })
    this.setState({
        chatMessage: ""
    })

}

render(){
    return(
        <React.Fragment>
        <div>
            <p style={{ fontSize: '2rem', textAlign: 'center' }}> Real Time Chat</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="infinite-container">
            {this.props.chatdetails.chathistory && (this.renderCards(this.props.chatdetails.chathistory))}
                {/*{this.props.chatdetails && this.props.chatdetails(
                    this.renderCards()
                )}*/}
                <div
                    ref={el => {
                        this.messagesEnd = el;
                    }}
                    style={{ float: "left", clear: "both" }}
                />
            </div>

            <Row >
                <Form layout="inline">
                <div class="input-group" style={{display:"flex", justifyContent:"space-between"}}>
                <input type="text" class="form-control" 
                style ={{width:"80%"}} 
                placeholder="Let's start talking"
                value={this.state.chatMessage}
                onChange = {this.handleSearchChange}/>
                <button  class="btn-btn-primary" style={{backgroundColor:"blue"}} style ={{width:"15%"}} onClick={this.submitChatMessage}> Enter</button>
            </div>
                </Form>
            </Row>
        </div>
    </React.Fragment>
)
}
}

const mapStateToProps = state => ({
    user: state.customerReducer,
    restaurant: state.restaurantReducer,
    chatdetails : state.chatReducer
});

function mapDispatchToProps(dispatch) {
    return {
        getChats: (data) => dispatch(getChats(data)),
        setChats : (data) => dispatch(setChats(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChatPage);
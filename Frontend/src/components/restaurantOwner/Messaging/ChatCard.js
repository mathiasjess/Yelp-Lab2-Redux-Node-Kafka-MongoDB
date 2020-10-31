import React from 'react'
import moment from 'moment'
import {Comment, Tooltip} from 'antd'

function ChatCard(props){
    // console.log("Inside Chat card", props.chatMessage)
    return(
        <div style={{ width: '100%' }}>
        <Comment
            author={<b>{props.sender}  </b>}
            content={
                    <p>
                        Message: {props.chatMessage}
                    </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(props.nowtime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </Tooltip>
            }
        />
    </div>
    )

}

export default ChatCard
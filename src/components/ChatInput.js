import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import uuid from 'react-uuid'
import { database } from '../firebase/config';
import { firestore } from '../firebase/config';

const ChatInput = (props) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState();
    const [owner] = useState('ADMIN');

    const messageRef = database.ref('line/'+props.channelId+'/'+props.clientId+'/message');
    const messagesRefC = database.ref('line/'+props.channelId+'/'+props.clientId+'/messages');

    console.log('props.clientId chatinput', props.clientId);


    const handleSubmit = (e) => {
        e.preventDefault();
        //setMessage(message);
        messagesRefC.push().set(message);     
        messageRef.update({timestamp:new Date().getTime()});    
        setText('');
    }

    const handleTextChange = (e) => {
        let text = e.target.value;
        setText(text);
        setMessage({channelID:props.channelId, message:{id:uuid(), text:text, type:'text'}, owner:owner, timestamp:new Date().getTime(), userID:props.clientId});
        console.log("🚀 ~ file: ChatBox.js ~ line 57 ~ handleTextChange ~ text", text)        
        console.log(new Date().getTime() );
        
    }
    console.log('message is', message);
    return (
        <Grid container style={{padding: '20px', position:'absolute', bottom:0}}>
            <form className="message" noValidate autoComplete="off" onSubmit={e => {handleSubmit(e)}}>
                <Grid item xs={11}>
                        
                    <TextField id="outlined-basic-email" label="พิมพ์ข้อความ" value={text} fullWidth onChange={e => {handleTextChange(e)}}/>
                        
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab color="primary" aria-label="add" onClick={e => {handleSubmit(e)}}><SendIcon /></Fab>
                </Grid>
            </form>
        </Grid>
    )
}

export default ChatInput
import React, { useRef, useEffect } from 'react';
import {  useListVals } from 'react-firebase-hooks/database';

import { database } from '../firebase/config';

import { makeStyles } from '@material-ui/core/styles';

  import Grid from '@material-ui/core/Grid';
  import List from '@material-ui/core/List';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: 'auto'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    borderLeft500: {
        borderLeft: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    },
    time: {
        fontSize:10
    }
  });

const Messages = (props) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null)
    const [values, loading, error] = useListVals(database.ref('line/'+props.channelId+'/'+props.clientId+'/messages')); 
    console.log(props);
    console.log('values is', values);

    const showTime = (value) => {
        let unix_timestamp = value;
        let date = new Date(unix_timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return hours+':'+minutes;
      }
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
      }, [values]);
    return (
        <List className={classes.messageArea}>
                
            {values.map((message) => 
                
                <ListItem key={message.message.id} className="message-box">
                    <Grid container className={message.owner.toLowerCase()}>
                        <Grid item xs={12}>
                        <ListItemText primary={message.message.text}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText className={classes.time} secondary={showTime(message.timestamp)}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            )
            }       
            <div ref={messagesEndRef} /> 
                   
                
        </List>
    )
}

export default Messages
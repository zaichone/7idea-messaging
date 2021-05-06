import React, { useState } from 'react';

import avatar from '../avatar.png';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const ClientList = (props) => {
    console.log(props.clients);
    const wrappedElement = document.getElementById('header');
    const handleScroll = (e) => {
        console.log(e);
    }
    const newClients = [...props.clients];
    
    newClients.sort((a, b) => b.message.timestamp - a.message.timestamp );
    console.log("🚀 ~ file: ClientListTest.js ~ line 24 ~ ClientListTest ~ newClients", newClients)
    return (
        <List className="listClients" id="clients" onScroll={(e) => handleScroll}>                     
                {newClients.map((client) => (
                    <ListItem button key={client.id} onClick={props.updateCurrentClient.bind(this,client)} className={props.clientId===client.id ? 'current-active':''}>                
           
                        <ListItemIcon>
                            <Avatar alt={client?.info?.displayName} src={client?.info?.pictureUrl} />
                        </ListItemIcon>
                        <ListItemText primary={client.info?.displayName} className="client-name"></ListItemText>
                        <ListItemText secondary={client?.message?.isRead==='UNREAD'? 'Unread': ''} align="right"></ListItemText>
                    </ListItem>
                ))}
        </List>
    )
}

export default ClientList
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    large:{
        width:80,
        height:80,
        marginBottom:15
    }
});

const ClientSingle = (props) => {
    const classes = useStyles();
    console.log('props single client', props)
    if(props.client){
        return (
            <>
            <Avatar align="center" alt={props.client?.info?.displayName} src={props.client?.info?.pictureUrl} className={classes.large}/> 
            <Typography variant="h6" display="block" align="center">{props.client?.info?.displayName}</Typography>
            </>
        )
    }
}

export default ClientSingle
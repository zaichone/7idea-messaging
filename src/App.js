import avatar from './avatar.png';
import './App.scss';
import React, { Component, useContext } from 'react';

import { withStyles  } from '@material-ui/core/styles';
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

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ClientList from './components/ClientList';
import ClientSingle from './components/ClientSingle';
import Messages from './components/Messages';
import ChatInput from './components/ChatInput';
import ClientListTest from './components/ClientListTest';

import { database } from './firebase/config';

const font =  "'Prompt', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font
  }
});
const useStyles  = theme => ({
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
      borderLeft: '1px solid #e0e0e0',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      paddingTop:30
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  time: {
      fontSize:10
  },
  large:{
      width:80,
      height:80,
      marginBottom:15
  }
});

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      clients:[],
      currentClient:{},
      channelId:'1655547650'
    }
    this.updateCurrentClient = this.updateCurrentClient.bind(this);
  }

  componentDidMount(){
    console.log("component App mounted");
    console.log("🚀 ~ file: App.js ~ line 21 ~ App ~ componentDidMount ~ channelId", this.state.channelId)
    const clientsRef = database.ref('line/'+this.state.channelId).orderByChild('message/timestamp').startAt(0).limitToLast(100);
    console.log('line/'+this.state.channelId);
    clientsRef.on('value', (snapshot) => {
      const clients = snapshot.val();
      let clientList = [];
      for(let id in clients){
        clientList.push({id, ...clients[id]});
      }
      this.setState({ clients:clientList }, function(){ console.log('First round', this.state)});
    });
    
  }
  updateCurrentClient(item){
    this.setState({
      currentClient:item,
      clientId:item.info.userId
    }, 
    function(){ 
      const clientRef = database.ref('line/'+this.state.channelId+'/'+this.state.currentClient.id);
      clientRef.child('message').update({'isRead':'READ'}); 
    })    
  }
  render(){
    const { classes } = this.props;
    return(
      <ThemeProvider theme={theme}>
      <div id="chat-box">
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>                
                    <List>
                        <ListItem button key="Admin">
                            <ListItemIcon>
                            <Avatar alt="Admin" src={avatar} />
                            </ListItemIcon>
                            <ListItemText primary="กองสลาก Admin"></ListItemText>
                        </ListItem>
                    </List>                
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    {this.state.clients && <ClientList clients={this.state.clients} updateCurrentClient={this.updateCurrentClient} clientId={this.state.currentClient.id}/>}
        
                    
                </Grid>
                <Grid item xs={6} style={{position:'relative'}}>
                  {this.state.currentClient.messages && <Messages clientId={this.state.currentClient.id} channelId={this.state.channelId}/>}
                    
                    <Divider />
                    <ChatInput clientId={this.state.currentClient.id} channelId={this.state.channelId}/>
                </Grid>
                <Grid item xs={3} className={classes.borderLeft500}>
                  {this.state.currentClient?<ClientSingle client={this.state.currentClient}/> :<Typography variant="h5">เลือกลูกค้าเพื่อตอบข้อความ</Typography>}
                  <Divider />
                  
                </Grid>
        </Grid>
    </div>
    </ThemeProvider>
    );
  } 
}

export default withStyles(useStyles)(App);

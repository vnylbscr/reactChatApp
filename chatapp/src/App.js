import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { Button, Container, TextField, Grid, ListItemText, ListItem } from '@material-ui/core';

const ENDPOINT = 'http://localhost:8000'; //your ip address


var socket;

function App() {
     const [message, setMessage] = useState({
          content: '',
          time: null,
          name: '',
     });
     const [messages, setMessages] = useState([]);
     useEffect(() => {
          socket = socketIOClient(ENDPOINT);
          socket.on('send message', (mesaj) => {
               setMessages((prevState) => [...prevState, mesaj]);
          });

     }, []);
     const submitMessage = () => {
          socket.emit('chat message', message);
          setMessage(prevState => ({ ...prevState, content: '', time: null, name: prevState.name }));
          console.log('mesaj:', message);
          console.log('mesajlar:', messages);
     };
     return (
          <Grid container direction='column' justify='center' alignItems='flex-start' style={{ marginTop: 20 }}>
               <TextField
                    label='İsim'
                    value={message.name}
                    placeholder='İsim'
                    onChange={(e) => {
                         setMessage({ ...message, name: e.target.value });
                    }}
                    style={{ width: 500, marginLeft: 10 }}
                    variant='outlined'
               />
               <TextField
                    label='Mesaj'
                    value={message.content}
                    placeholder='Bir şeyler yaz'
                    onChange={(e) => {
                         setMessage({
                              ...message, content: e.target.value,
                              time: new Date().toLocaleTimeString()
                         });
                    }}
                    style={{ width: 500, marginTop: 20, marginLeft: 10 }}
                    variant='outlined'
                    inputProps={{
                         style: {
                              height: 100,
                         }
                    }}

               />
               <Container style={{ marginTop: 30 }}>
                    <Button onClick={submitMessage} variant='contained' color='primary'>
                         Gönder
                    </Button>
                    <Button
                         variant='outlined'
                         onClick={() => {
                              setMessages([]);
                              setMessage(prevState => ({
                                   content: '',
                                   time: null,
                                   name: prevState.name
                              }));
                         }}
                         style={{ marginLeft: 20 }}
                         color='secondary'

                    >
                         Sıfırla
                    </Button>
               </Container>
               <Container>
                    <h2 style={{fontFamily:'Helvetica'}}>Chat Listesi</h2>
                    {messages.map((mesaj) => (
                         <ListItem>
                              <ListItemText
                                   primary={mesaj.name}
                                   secondary={`${mesaj.content} gönderildi: ${mesaj.time}`}
                              >
                              </ListItemText>
                         </ListItem>
                    ))}
               </Container>
          </Grid>
     );
}
export default App;

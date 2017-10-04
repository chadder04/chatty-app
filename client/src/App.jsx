import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import HeaderBar from './HeaderBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: { name: 'Anonymous', usernameColor: 'black' },
      usersOnline: 0,
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }


  componentDidMount() {
    this.socket.onopen = (event) => {
      this.addMessage('NewUser', 'A new user has connected..', 'postOnlineUser');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      let incomingData = {}

      switch(data.type) {
        case 'incomingMessage':
          // handle incoming message
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.username = data.username;
          incomingData.usernameColor = data.usernameColor;
          incomingData.content = data.content;
          break;
        case 'incomingNotification':
          // handle incoming notification
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.content = data.content;
          incomingData.usernameColor = data.usernameColor;
          break;
        case 'incomingOnlineUser':
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.content = data.content;
          incomingData.usernameColor = data.usernameColor;
          this.setState({
            currentUser: { 
              name: this.state.currentUser.name, 
              usernameColor: data.usernameColor 
            },
            usersOnline: data.usersOnline
          })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }

      this.setState({
        messages: this.state.messages.concat(incomingData)
      })
    };
  }

  componentWillUnmount() {
    this.socket.close()
  }

  
  addMessage(user, message, type = 'postMessage') {
    const newMessage = {
      type: type,
      username: user,
      usernameColor: this.state.currentUser.usernameColor,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  setUsername(username) {
    this.setState({
      currentUser: { 
        name: username,
        usernameColor: this.state.currentUser.usernameColor
       }
    });
  }
  
  render() {
    return (
      <div>
        <HeaderBar 
          usersOnline={this.state.usersOnline} />
        <MessageList 
          messageList={this.state.messages}>
        </MessageList>
        <ChatBar 
          currentUser={this.state.currentUser} 
          setUsername={this.setUsername} 
          addMessage={this.addMessage}>
        </ChatBar>
      </div>
    );
  }

}

export default App;
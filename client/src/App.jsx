import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import HeaderBar from './HeaderBar.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: { name: 'Anonymous', color: 'black' },
      usersOnline: 0,
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }


  componentDidMount() {
    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data);

      switch (incomingData.type) {
        case 'incomingMessage':
          if (incomingData.content[0] === '/') {
            let cmd = incomingData.content.split(' ').shift().replace('/', '');
            let msg = incomingData.content.split(' ').splice(1).join(' ');
            switch (cmd) {
              case 'me':
                incomingData.type = 'incomingNotification';
                incomingData.content = incomingData.username + ' ' + msg;
              break;
              default: 
                incomingData.type = 'incomingNotification';
                incomingData.content = incomingData.username + ' attempted to execute a command that was not recognized.';
              break;
            }
          }
          break;
        case 'incomingNotification':
          break;
        case 'incomingOnlineUser':
          incomingData.content = 'A new user has connected..';
          this.setState({
            usersOnline: incomingData.usersOnline
          })
          break;
        case 'incomingDisconnectedUser':
          incomingData.content = 'A user has disconnected..';
          this.setState({
            usersOnline: incomingData.usersOnline
          })
          break;
        case 'incomingSetColor':
          this.setState({
            currentUser: {
              name: this.state.currentUser.name,
              color: incomingData.color
            }
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + incomingData.type);
      }

      this.setState({
        messages: this.state.messages.concat(incomingData)
      })
    };
  }

  componentWillUnmount() {
    this.socket.close()
  }


  addMessage(user, message, type) {
    const newMessage = {
      type: type,
      username: user,
      color: this.state.currentUser.color,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  setUsername(username, color) {
    this.setState({
      currentUser: {
        name: username,
        color: color
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

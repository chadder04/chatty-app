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
      const data = JSON.parse(event.data);

      let incomingData = {}

      switch (data.type) {
        case 'incomingMessage':
          // handle incoming message
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.username = data.username;
          incomingData.color = data.color;
          incomingData.content = data.content;
          break;
        case 'incomingNotification':
          // handle incoming notification
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.content = data.content;
          incomingData.color = data.color;
          break;
        case 'incomingOnlineUser':
          incomingData.id = data.id;
          incomingData.type = data.type;
          incomingData.content = 'A new user has connected..';
          this.setState({
            usersOnline: data.usersOnline
          })
          break;
        case 'incomingSetColor':
          this.setState({
            currentUser: {
              name: this.state.currentUser.name,
              color: data.color
            }
          });
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

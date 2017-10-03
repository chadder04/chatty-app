import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: { name: 'Chadder' },
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }


  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to WebSocket server.');
    };

    this.socket.onmessage = (event) => {
      let incomingMessage = JSON.parse(event.data);
      this.setState({
        messages: this.state.messages.concat(incomingMessage)
      })
    };
  }

  componentWillUnmount() {
    this.socket.close()
  }

  
  addMessage(user, message) {
    const newMessage = {
      username: user,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  setUsername(username) {
    this.setState({
      currentUser: { name: username }
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a></nav>
        <MessageList messageList={this.state.messages}></MessageList>
        <ChatBar currentUser={this.state.currentUser} setUsername={this.setUsername} addMessage={this.addMessage}></ChatBar>
      </div>
    );
  }

}

export default App;

import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Chadder' },
      nextMsgID: 5,
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        },
        {
          id: 3,
          username: 'Chadder',
          content: 'I\'m sorry Bob, there not coming back!'
        }
      ]
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  
  addMessage(user, message) {
    const newMessage = {
      id: this.state.nextMsgID,
      username: user,
      content: message
    }
    this.setState({
      nextMsgID: this.state.nextMsgID + 1,
      //messages: [newMessage].concat(this.state.messages)
      messages: this.state.messages.concat(newMessage)
    });
  }
  
  handleEnter(e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    console.log(keycode);
    if (keycode == '13') {
      this.addMessage(this.state.currentUser.name, e.target.value);
    }
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages}></MessageList>
        <ChatBar currentUser={this.state.currentUser} handleEnter={this.handleEnter}></ChatBar>
      </div>
    );
  }
}
export default App;

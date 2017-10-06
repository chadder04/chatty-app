import React, { Component } from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="messages">
        {this.props.messageList.map((message) => {
          switch (message.type) {
            case 'incomingMessage':
              return (
                <Message key={message.id} messageBody={message}></Message>
              );
            case 'incomingNotification':
            case 'incomingDisconnectedUser':
            case 'incomingOnlineUser':
              return (
                <SystemMessage key={message.id} messageBody={message.content}></SystemMessage>
              );
          }
        })}
      </main>
    );
  }
}

export default MessageList;

import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <main className="messages">
          {this.props.messageList.map((message) => {
            return (
              <Message key={message.id} messageBody={message}></Message>
            );
          })}
        </main>
    );
  }
}
export default MessageList;

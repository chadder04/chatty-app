import React, { Component } from 'react';
import ImageMessage from './ImageMessage.jsx';

class Message extends Component {
  render() {
    let testForURL = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(this.props.messageBody.content);
    let messageBody = (testForURL) ? <ImageMessage imgSrc={ this.props.messageBody.content } /> : this.props.messageBody.content;
    return (
      <div className="message">
        <span className="message-username" style={{ color: this.props.messageBody.color }}>{this.props.messageBody.username}</span>
        <span className="message-content">{messageBody}</span>
      </div>
    );
  }
}
export default Message;

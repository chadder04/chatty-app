import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
      this.props.addMessage(this.props.currentUser.name, e.target.value, 'postMessage');
      e.target.value = '';
    }
  }

  setUsername(e) {
    if (e.key === 'Enter') {
      this.props.setUsername(e.target.value, this.props.currentUser.color);
      this.props.addMessage(e.target.value, `${this.props.currentUser.name} changed their name to ${e.target.value}`, 'postNotification')
      e.target.value = e.target.value;
      this.refs.messagebar.focus();
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={this.setUsername} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" ref="username"/>
        <input className="chatbar-message" onKeyUp={this.sendMessage} placeholder="Type a message and hit ENTER" ref="messagebar" />
      </footer>
    );
  }
}
export default ChatBar;

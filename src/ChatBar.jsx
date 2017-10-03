import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  sendMessage(e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      this.props.addMessage(this.props.currentUser.name, e.target.value);
      e.target.value = '';
    }
  }

  setUsername(e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      this.props.setUsername(e.target.value);
      this.props.addMessage(e.target.value, `${this.props.currentUser.name} changed their name to ${e.target.value}`, 'postNotification')
      e.target.value = e.target.value;
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={this.setUsername} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyUp={this.sendMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;

import React, { Component } from 'react';

class HeaderBar extends Component {
  render() {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="navbar-onlineusers">{this.props.usersOnline} Users Online</span>
        </nav>
    );
  }
}
export default HeaderBar;

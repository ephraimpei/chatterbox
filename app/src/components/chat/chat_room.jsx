import React from 'react';

class ChatRoom extends React.Component {
  constructor (props, context) {
    super(props, contextTypes);
    this.changeMessage = this.changeMessage.bind(this);
    this.handleKeyPress = tihs.handleKeyPress.bind(this);
    this.handleMessageSubmission = this.handleMessageSubmission.bind(this);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleMessageSubmission(); }
  }

  handleMessageSubmission (e) {
    socket.emit('global chat request', { data: e.currentTarget.value });
  }

  render () {
    return (
      <div className="chat-room-wrapper">
        <div className="chat-room"></div>
        <form className="chat-room-form"
          onKeyPress={ this.handleKeyPress }
          onSubmit={ this.handleMessageSubmission }>
          <input className="chat-room-input" type="text"/>
          <button className="submit" type="submit">Send</button>
        </form>
      </div>
    );
  }
}

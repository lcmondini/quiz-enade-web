import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-web-gifted-chat';

import firebase from 'firebase';

import { Container } from './styles';

const mapStateToProps = state => ({
  profile: state.user.profile,
});

// retrieve the messages from the Backend
function loadMessages(callback, course) {
  this.messagesRef = firebase.database().ref(course);
  this.messagesRef.off();
  const onReceive = data => {
    const message = data.val();
    callback({
      _id: data.key,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        id: message.user.id,
        name: message.user.name,
      },
    });
  };
  this.messagesRef.limitToLast(20).on('child_added', onReceive);
}
// send the message to the Backend
function sendMessage(message) {
  console.log(message);
  for (let i = 0; i < message.length; i++) {
    this.messagesRef.push({
      text: message[i].text,
      user: message[i].user,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }
}
// close the connection to the Backend
function closeChat() {
  if (this.messagesRef) {
    this.messagesRef.off();
  }
}
class Chat extends Component {
  state = {
    messages: [],
  };
  uid = '';
  // initialize Firebase Backend
  constructor() {
    super();
    loadMessages = loadMessages.bind(this);
    sendMessage = sendMessage.bind(this);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDZTOXOT2waYz2dNTQiYjGGMdcPeZmVlpQ',
        authDomain: 'quiz-enade.firebaseapp.com',
        databaseURL: 'https://quiz-enade.firebaseio.com',
        storageBucket: 'quiz-enade.appspot.com',
      });
      firebase.auth().signInAnonymously();
    }
  }

  componentDidMount() {
    loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    }, this.props.profile.course);
  }

  componentWillMount() {
    this.messagesRef = null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          // send message to the backend.
          sendMessage(message);
        }}
        user={{
          id: this.props.profile.id,
          name: this.props.profile.name,
        }}
      />
    );
  }
}

export default connect(mapStateToProps)(Chat);

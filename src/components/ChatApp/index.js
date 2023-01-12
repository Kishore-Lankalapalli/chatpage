import {Component} from 'react'
import {v4} from 'uuid'
import Popup from 'reactjs-popup'
import {MdOutlineGroup} from 'react-icons/md'
import {IoIosSend} from 'react-icons/io'
import {BiLike} from 'react-icons/bi'
import {UsernameAcronym} from './styledComponents'
import './index.css'

const colors = ['#fcba03', '#00bceb', '#70c229', '#c229b2', '#c22945']

const MessageItem = props => {
  const {message, onLikeMessage} = props

  const {randomColor, messageText, count, userName, id} = message

  const onLikeMessageText = () => {
    onLikeMessage(id)
  }

  return (
    <li className="message-item">
      <UsernameAcronym bgColor={randomColor}>{userName[0]}</UsernameAcronym>
      <div className="message-details-container">
        <h1 className="username-text">{userName}</h1>
        <p className="message-text">{messageText}</p>
      </div>
      <div className="like-container">
        <button
          type="button"
          onClick={onLikeMessageText}
          className="send-button"
        >
          <BiLike className="like-icon" />
        </button>
        {count > 0 && <p>{count}</p>}
      </div>
    </li>
  )
}

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

class ChatApp extends Component {
  state = {
    messagesList: [],
    messageText: '',
    isAmphercent: false,
  }

  onChangeMessageText = event => {
    this.setState({messageText: event.target.value})
  }

  onSendMessage = () => {
    const {messageText, messagesList} = this.state

    const random = Math.ceil(Math.random() * userList.length - 1)

    const userName = userList[random]

    const randomColor = colors[Math.ceil(Math.random() * colors.length - 1)]

    const newMessage = {
      id: v4(),
      messageText,
      count: 0,
      userName,
      randomColor,
    }

    this.setState(prevState => ({
      messagesList: [...prevState.messagesList, newMessage],
      messageText: '',
    }))
  }

  onLikeMessage = id => {
    const {messagesList} = this.state
    this.setState({
      messagesList: messagesList.map(message => {
        if (message.id === id) {
          const counter = message.count + 1

          return {...message, count: counter}
        }
        return message
      }),
    })
  }

  render() {
    const {messageText, messagesList, isAmphercent} = this.state

    return (
      <div className="bg-container">
        <div className="header-container">
          <div>
            <h1 className="introduction-header-heading">INTRODUCTIONS</h1>
            <p className="header-description">
              This channel is for company wide chatter
            </p>
          </div>
          <div className="members-count-container">
            <p className="responded-members-count">3 / 10</p>
            <MdOutlineGroup className="group-icon" />
          </div>
        </div>
        <hr />
        <div className="chat-container">
          <ul className="messages-list-container">
            {messagesList.map(message => (
              <MessageItem
                onLikeMessage={this.onLikeMessage}
                key={message.id}
                message={message}
              />
            ))}
          </ul>

          <div className="input-container">
            <input
              placeholder="Type Message"
              className="input-element"
              type="text"
              onChange={this.onChangeMessageText}
              value={messageText}
            />
            <button
              type="button"
              onClick={this.onSendMessage}
              className="send-button"
            >
              <IoIosSend className="send-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatApp

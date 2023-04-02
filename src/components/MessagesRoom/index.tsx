import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Chat } from '../../types'
import { UserContext } from '../../user-context'
import { getChatById, readMessages } from '../../utils'
import Messages from '../Messages'
import MessagesHeader from '../MessagesHeader'
import MessagesInput from '../MessagesInput'
import styles from './index.module.scss'

export default function MessagesRoom() {
  const { userId } = useParams()

  const location = useLocation()

  const userCtx = useContext(UserContext)

  const [chat, setChat] = useState<Chat>()

  useEffect(manageRoomFetch, [userCtx.currUser, userCtx.currProfile, [location.pathname]])
  useEffect(manageRead, [chat])

  return (
    <div className={styles.main}>
      {
        userId && chat?.user ? <MessagesHeader userId={userId} profile={chat.user} /> : null
      }
      {
        !chat?.id ? null :
        <>
          <Messages profile={chat.user} messages={chat.messages} />
          <MessagesInput chatId={chat?.id} />
        </>
      }

    </div>
  )

  // *************************

  function manageRead() {
    if (!chat) return
    let newChats = userCtx.chats
    let newChat = newChats.find(findChat) as Chat
    for (let i = newChat.messages.length - 1; i >= 0; i--) {
      if (newChat.messages[i].authorId === userCtx.currUser!.uid || newChat.messages[i].read) break
      else newChat.messages[i].read = true
    }
    userCtx.setChats(newChats)
    readMessages(chat.id, userCtx.currUser!).then()

    // ********************************

    function findChat(chat: Chat) {
      return chat.userIds.includes(userId!)
    }
  }

  function manageRoomFetch() {
    if (!(userCtx.currUser && userCtx.currProfile)) return

    const chats = userCtx.chats.filter(filterChat)

    if (chats.length !== 0) setChat(chats[0])
    else {
      getChatById(userCtx.currUser, userId as string).then(function afterFetchedChat(newChat: Chat | undefined) {
        let newChats = [...userCtx.chats]
        newChats.push(newChat as Chat)
        userCtx.setChats(newChats)
      })
    }

    // *******************

    function filterChat(chat: Chat) {
      return chat.userIds.includes(userId as string)
    }
  }
}

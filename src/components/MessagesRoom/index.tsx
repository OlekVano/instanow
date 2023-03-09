import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chat } from '../../types'
import { UserContext } from '../../user-context'
import { getChatById } from '../../utils'

export default function MessagesRoom() {
  const { userId } = useParams()

  const userCtx = useContext(UserContext)

  const [chat, setChat] = useState<Chat>()

  useEffect(manageRoomFetch, [userCtx.currUser])

  return (
    <div>MessagesRoom</div>
  )

  // *************************

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

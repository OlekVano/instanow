import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chat, CurrentProfile, Profile } from '../../types'
import Circle from '../Circle'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

type Props = {
  chats: Chat[]
}

export default function UnreadMessages({ chats }: Props) {
  const [[unreadChats, totalUnreadMessages], setUnreadChats] = useState<[[Chat, number][], number]>([[], 0])

  useEffect(function setState() {
    setUnreadChats(getUnreadChats(chats))
  }, [chats])

  return (
    <>
      {
      unreadChats.length === 0 ? null :
      <div className={styles.main}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>Messages</div>
          <Circle text={totalUnreadMessages.toString()} type={1} />
        </div>
        <div className={styles.wrapper}>
          {
            unreadChats.map(function renderFollowedProfile(chat, i) {
              return (
                <div className={styles.container}>
                  <div className={styles.wrapper2}>
                    <ProfileSmall key={i} profile={chat[0].user} />
                  </div>
                  <Circle text={chat[1].toString()} type={1} />
                </div>
              )
            })
          }
        </div>
      </div>
      }
    </>
  )

  // ***********************************

  function getUnreadChats(chats: Chat[]): [[Chat, number][], number] {
    // let unreadChats = chats.map(mapChat)
    // unreadChats = unreadChats.filter(function filterChat(chat) {return chat}) as Chat[]
    // console.log('unreadChats', unreadChats)
    // return unreadChats as Chat[]

    // // **************************

    // function mapChat(chat: Chat) {
    //   return (chat.messages[0].authorId === chat.user.id && !chat.messages[0].read) ? chat : null
    // }

    let unreadChats: [Chat, number][] = []
    let totalUnreadMessages = 0

    for (let i = 0; i < chats.length; i++) {
      const nUnreadMessages = getNumUnreadMessages(chats[i])
      totalUnreadMessages += nUnreadMessages
      if (nUnreadMessages > 0) {
        unreadChats.push([chats[i], nUnreadMessages])
      }
    }

    return [unreadChats, totalUnreadMessages]

    // *****************************

    function getNumUnreadMessages(chat: Chat): number {
      let nUnreadMessages = 0
      for (let i = chat.messages.length - 1; i >= 0; i--) {
        if (chat.messages[i].authorId !== chat.user.id || chat.messages[i].read === true) {
          break
        }
        else {
          nUnreadMessages++
        }
      }
      return nUnreadMessages
    }
  }
}

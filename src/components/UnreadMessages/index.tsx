import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chat, CurrentProfile, Profile } from '../../types'
import Circle from '../Circle'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'
import { getNumUnreadMessages } from '../../utils'
import { UserContext } from '../../user-context'

type Props = {
  chats: Chat[]
}

export default function UnreadMessages({ chats }: Props) {
  const [[unreadChats, totalUnreadMessages], setUnreadChats] = useState<[[Chat, number][], number]>([[], 0])

  const ctx = useContext(UserContext)

  useEffect(function setState() {
    setUnreadChats(getUnreadChats(chats))
  }, [chats])

  return (
    <>
      {
      ctx.currProfile && unreadChats.length === 0 ? null :
      <div className={styles.main}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>Messages</div>
          <Circle text={ctx.currProfile ? totalUnreadMessages.toString() : ''} type={1} />
        </div>
        <div className={styles.wrapper}>
          {
            !ctx.currProfile ? <ProfileSmall />
            :
            unreadChats.map(function renderFollowedProfile(chat, i) {
              return (
                <Link to={`/messages/${chat[0].user.id}`}>
                  <div className={styles.container} key={i}>
                    <div className={styles.wrapper2}>
                      <ProfileSmall profile={chat[0].user} />
                    </div>
                    <Circle text={chat[1].toString()} type={1} />
                  </div>
                </Link>
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
  }
}

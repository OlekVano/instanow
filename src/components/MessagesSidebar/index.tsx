import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Chat } from '../../types'
import { UserContext } from '../../user-context'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'
import Circle from '../Circle'
import { getNumUnreadMessages, timestampToStr } from '../../utils'

export default function MessagesSidebar() {
  const userCtx = useContext(UserContext)
  const location = useLocation()
  const { userId } = useParams()

  if (userCtx.chats.length === 0) return null

  return (
    <div className={`${styles.main} ${location.pathname !== '/messages' ? 'd-none d-lg-block' : styles.full}`}>
      {
        userCtx.chats.map(function mapChat(chat: Chat, i: number) {
          const nUnreadMessages = getNumUnreadMessages(chat)

          return (
            <Link to={`/messages/${chat.user.id}`} key={i} className={`${styles.button} ${chat.user.id === userId ? styles.selected : ''}`}>
              <div className={styles.container}>
                <ProfileSmall profile={chat.user} />
                {
                  nUnreadMessages > 0 ? <Circle text={nUnreadMessages.toString()} /> :
                  <div>
                    {
                      chat.messages.length === 0 ? 'Never' : timestampToStr(chat.messages[chat.messages.length - 1].sentAt)
                    }
                  </div>
                }
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

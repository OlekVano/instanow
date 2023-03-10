import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Chat } from '../../types'
import { UserContext } from '../../user-context'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

export default function MessagesSidebar() {
  const userCtx = useContext(UserContext)
  const location = useLocation()
  const { userId } = useParams()

  return (
    <div className={styles.main}>
      {
        userCtx.chats.map(function mapChat(chat: Chat, i: number) {
          return (
            <Link to={`/messages/${chat.user.id}`} key={i} className={`${styles.button} ${chat.user.id === userId ? styles.selected : ''}`}>
              <ProfileSmall profile={chat.user} />
            </Link>
          )
        })
      }
    </div>
  )
}
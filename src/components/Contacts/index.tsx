import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Chat, CurrentProfile, Profile } from '../../types'
import Circle from '../Circle'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

type Props = {
  chats: Chat[]
}

export default function Contacts({ chats }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Contacts</div>
        <Circle text={chats.length.toString()} type={2} />
      </div>
      <div className={styles.container}>
        {chats.length !== 0 ? 
        chats.map(function renderFollowedProfile(chat, i) {
          return (
            <Link to={`/messages/${chat.user.id}`} key={i}>
              <ProfileSmall profile={chat.user} />
            </Link> 
          ) 
        })
        : <div className={styles.text}>You can find someone to chat with <Link to='/people' className={styles.link}>here</Link></div>
        }
      </div>
    </div>
  )
}

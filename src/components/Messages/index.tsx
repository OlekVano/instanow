import { useContext } from 'react'
import { Message, Profile, ProfileWithoutPosts } from '../../types'
import { UserContext } from '../../user-context'
import { timestampToStr } from '../../utils'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

type Props = {
  messages: Message[],
  profile: ProfileWithoutPosts
}

export default function Messages({ messages, profile }: Props) {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      {
        messages.map(function mapMessage(message: Message, i: number) {
          return (
            <div className={`${styles.messageContainer} ${message.authorId === ctx.currUser?.uid ? styles.right : ''}`} key={i}>
              <ProfileSmall profile={message.authorId === profile.id ? profile : ctx.currProfile!} timestamp={timestampToStr(message.sentAt)} />
              <div className={styles.text}>
                {message.text}
              </div>
              <div className={styles.timestamp}>{timestampToStr(message.sentAt)}</div>
            </div>
          )
        })
      }
    </div>
  )
}

import { useContext, useEffect, useRef } from 'react'
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

  const selfRef = useRef<HTMLDivElement>(null)

  useEffect(function manageMessagesChange() {
    console.log('manage')
    selfRef.current!.scrollTo({top: selfRef.current!.scrollHeight, behavior: 'smooth'})
  }, [messages.length])

  return (
    <div className={styles.main} ref={selfRef}>
      {
        messages.map(function mapMessage(message: Message, i: number) {
          return (
            <div className={`${styles.messageContainer} ${message.authorId === ctx.currUser?.uid ? styles.right : ''}`} key={i}>
              <ProfileSmall profile={message.authorId === profile.id ? profile : ctx.currProfile!} timestamp={timestampToStr(message.sentAt)} />
              <div className={styles.text}>
                {message.text.trim()}
              </div>
              <div className={styles.timestamp}>{timestampToStr(message.sentAt)}</div>
            </div>
          )
        })
      }
    </div>
  )
}

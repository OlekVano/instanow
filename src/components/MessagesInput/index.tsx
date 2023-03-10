import { useContext } from 'react'
import { UserContext } from '../../user-context'
import Button from '../Button'
import MultilineInput from '../MultilineInput'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

export default function MessagesInput() {
  const userCtx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <ProfilePicture size='s' src={userCtx.currProfile?.profilePicture} />
      <MultilineInput defaultValue='Send a message...' />
      <Button text='Send' />
    </div>
  )
}

import { ChangeEvent, useContext, useState } from 'react'
import { UserContext } from '../../user-context'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import Modal from '../Modal'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  onExit?: Function
}

export default function CommentModal({ onExit=function(){} }: Props) {
  const userCtx = useContext(UserContext)
  const [text, setText] = useState('')

  return (
    <Modal onExit={onExit}>
      <CardWrapper>
      <div className={styles.main}>
          <div className={styles.container}>
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            <textarea value={text} placeholder='What do you think?' className={styles.input} onChange={manageTextChange} />
          </div>
          <div className={styles.buttonsContainer2}>
            <Button text='Close' type={2} func={onExit} />
            <Button text='Comment' func={leaveComment} />
          </div>
        </div>
      </CardWrapper>
    </Modal>
  )

  // ***********************************

  function manageTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  function leaveComment() {

  }
}

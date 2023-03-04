import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Comment, Profile, WithComments } from '../../types'
import { UserContext } from '../../user-context'
import { generateUniqueId } from '../../utils'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import Modal from '../Modal'
import MultilineInput from '../MultilineInput'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  onExit?: Function,
  postId: string,
  query: number[],
  onComment: (text: string) => unknown
}

export default function CommentModal({ onExit=function(){}, onComment, postId, query }: Props) {
  const userCtx = useContext(UserContext)
  const [text, setText] = useState('')
  const [inputId] = generateUniqueId()

  useEffect(() => {
    document.getElementById(inputId)?.focus()
  })

  return (
    <Modal onExit={onExit}>
      <CardWrapper>
      <div className={styles.main}>
          <div className={styles.container}>
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            <div className={styles.inputContainer}>
              <MultilineInput autofocus={true} onInput={manageTextChange} />
            </div>
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
    setText(e.target.innerText)
  }

  async function leaveComment() {
    if (!text) {
      alert('Comment can\'t be empty')
      return
    }

    const json = JSON.stringify({
      text: text,
      query: query
    })

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comment`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await userCtx.currUser?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) {
      onComment(text)
      onExit()
    }
    else alert(`Error: ${res.statusText}`)
  }
}

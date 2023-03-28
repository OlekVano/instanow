import { useContext, useRef } from 'react'
import { UserContext } from '../../user-context'
import Button from '../Button'
import ButtonSmall from '../ButtonSmall'
import MultilineInput from '../MultilineInput'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import paperPlane from '../../assets/paper-plane.png'

export default function MessagesInput() {
  const userCtx = useContext(UserContext)

  const inputRef = useRef<HTMLDivElement>(null)

  const defaultInputText = 'Send a message...'

  return (
    <div className={styles.main}>
      <div className={styles.inputWrapper}>
        <MultilineInput defaultValue={defaultInputText} reference={inputRef} onFocus={onInputFocus} onBlur={onInputBlur} />
      </div>
      <ButtonSmall image={paperPlane} />
    </div>
  )

  // ***********************************

  function onInputFocus() {
    if (inputRef.current!.innerText === defaultInputText) inputRef.current!.innerText = ''
  }

  function onInputBlur() {
    if (inputRef.current!.innerText === '') inputRef.current!.innerText = defaultInputText
  }
}

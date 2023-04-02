import { useContext, useRef } from 'react'
import { UserContext } from '../../user-context'
import Button from '../Button'
import ButtonSmall from '../ButtonSmall'
import MultilineInput from '../MultilineInput'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import paperPlane from '../../assets/paper-plane.png'
import { sendMessage } from '../../utils'
import { Chat } from '../../types'

type Props = {
  chatId: string
}

export default function MessagesInput({ chatId }: Props) {
  const userCtx = useContext(UserContext)

  const inputRef = useRef<HTMLDivElement>(null)

  const defaultInputText = 'Send a message...'

  return (
    <div className={styles.main}>
      <div className={styles.inputWrapper}>
        <MultilineInput defaultValue={defaultInputText} reference={inputRef} onFocus={onInputFocus} onBlur={onInputBlur} />
      </div>
      <ButtonSmall image={paperPlane} func={message} />
    </div>
  )

  // ***********************************

  async function message() {
    const status = await sendMessage(inputRef.current!.innerText, '', chatId, userCtx.currUser!)
    if (status !== 200) return
    let newChats = [...userCtx.chats]
    newChats.find(findChat)?.messages.push({
      text: inputRef.current!.innerText,
      image: '',
      read: false,
      authorId: userCtx.currUser!.uid,
      sentAt: Date.now()
    })
    userCtx.setChats(newChats)
    inputRef.current!.innerText = defaultInputText;
    inputRef.current!.blur()

    // *******************

    function findChat(chat: Chat) {
      return chat.id === chatId
    }
  }

  function onInputFocus() {
    if (inputRef.current!.innerText === defaultInputText) inputRef.current!.innerText = ''
  }

  function onInputBlur() {
    if (inputRef.current!.innerText === '') inputRef.current!.innerText = defaultInputText
  }
}

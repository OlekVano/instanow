import { ChangeEvent, ChangeEventHandler, RefObject, TextareaHTMLAttributes, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../user-context';
import Button from '../Button';
import CardWrapper from '../CardWrapper';
import Modal from '../Modal';
import ProfilePicture from '../ProfilePicture';
import styles from './index.module.scss'
import landscapeIcon from '../../assets/picture.png'
import { ModalContext } from '../../modal-context';
import { generateUniqueId } from '../../utils';
import { useNavigate } from 'react-router-dom';
import MultilineInput from '../MultilineInput';

export default function CreatePostModal() {
  const userCtx = useContext(UserContext)
  const modalCtx = useContext(ModalContext)

  const [pictureInputId] = useState(generateUniqueId())
  const [picture, setPicture] = useState<string>()
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])

  return (
    <Modal onExit={closeModal}>
      <CardWrapper>
        <div className={styles.main}>
          <div className={styles.container}>
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            {/* <textarea value={text} placeholder="What's happening?" className={styles.input} onChange={manageTextChange} /> */}
            <div className={styles.inputWrapper}>
              <MultilineInput reference={inputRef} onInput={manageTextChange} />
            </div>
          </div>
          {
            picture ? 
            <img src={picture} className={styles.picture} />
            :
            <div className={styles.photoContainer}>
              <img src={landscapeIcon} className={styles.image} />
              <div className={styles.buttonsContainer}>
                <Button text='Upload picture' width='150px' func={triggerImageUpload} />
                <input id={pictureInputId} onChange={manageImageUpload} type='file' accept='image/*' style={{display: 'none'}} /> 
                {/* <Button text='Take picture' width='150px' /> */}
              </div>
            </div>
          }
          <div className={styles.buttonsContainer2}>
            <Button text='Close' type={2} func={closeModal} />
            <Button text='Post' func={createPost} />
          </div>
        </div>
      </CardWrapper>
    </Modal>
  )

  // *************************************

  function closeModal() {
    modalCtx.setModal('')
  }

  async function createPost() {
    if (!text && !picture) {
      alert('Post can\'t be empty')
      return
    }

    const json = JSON.stringify({
      text: text,
      picture: picture
    })

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await userCtx.currUser?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) {
      navigate(`/posts/${(await res.json()).id}`)
      modalCtx.setModal('')
    }
    else alert(`Error: ${res.statusText}`) 
  }

  function manageTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.innerText)
  }

  function triggerImageUpload() {
    document.getElementById(pictureInputId)?.click()
  }

  function manageImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        setPicture(fileReader.result as string)
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }
}

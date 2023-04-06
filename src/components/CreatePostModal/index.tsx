import { ChangeEvent, ChangeEventHandler, RefObject, TextareaHTMLAttributes, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../user-context';
import Button from '../Button';
import CardWrapper from '../CardWrapper';
import Modal from '../Modal';
import ProfilePicture from '../ProfilePicture';
import styles from './index.module.scss'
import landscapeIcon from '../../assets/picture.png'
import { ModalContext } from '../../modal-context';
import { downscaleImage, generateUniqueId, getFilteredImage, sleep } from '../../utils';
import { useNavigate } from 'react-router-dom';
import MultilineInput from '../MultilineInput';
import { imgFilters } from '../../consts';
import { Filter } from '../../types';
import Filters from '../Filters';
import { isMobile } from 'react-device-detect';

export default function CreatePostModal() {
  const userCtx = useContext(UserContext)
  const modalCtx = useContext(ModalContext)

  const [visible, setVisible] = useState(false)

  const [pictureInputId] = useState(generateUniqueId())
  const [picture, setPicture] = useState<string>()
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>(1)

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const takePictureInputRef = useRef<HTMLInputElement>(null)

  useEffect(function makeVisible() {setVisible(true)}, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])

  return (
    <Modal onExit={closeModal} visible={visible}>
      <CardWrapper style={visible ? {transform: 'translateY(0)', transitionDuration: '200ms'} : {transform: 'translateY(-100vh)', transitionDuration: '200ms'}}>
        <div className={styles.main}>
          <div className={styles.container}>
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            <div className={styles.inputWrapper}>
              <MultilineInput reference={inputRef} onInput={manageTextChange} />
            </div>
          </div>
          {
            picture ?
            <>
              <img src={picture} className={styles.picture} style={{filter: imgFilters[filter]}} />
              <Filters img={picture} filter={filter} setFilter={setFilter} />
            </>
            :
            <div className={styles.photoContainer}>
              <img src={landscapeIcon} className={styles.image} />
              <div className={styles.buttonsContainer}>
                <Button text='Upload picture' width='150px' func={triggerImageUpload} />
                {
                  isMobile ? <Button text='Take picture' width='150px' func={triggerTakePicture} /> : null
                }
                <input id={pictureInputId} onChange={manageImageUpload} type='file' accept='image/*' style={{display: 'none'}} />
                <input ref={takePictureInputRef} onChange={manageImageUpload} type='file' accept='image/*;capture=camera' style={{display: 'none'}} /> 
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

  function triggerTakePicture() {
    takePictureInputRef.current!.click()
  }

  function closeModal() {
    setVisible(false)
    sleep(200).then(function setModalNone() {
      modalCtx.setModal('')
    })

  }

  async function createPost() {
    if (!text && !picture) {
      alert('Post can\'t be empty')
      return
    }

    const json = JSON.stringify({
      text: text,
      picture: picture ? await getFilteredImage(filter, picture!) : picture
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
    const maxImageSize = 1600
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      downscaleImage(fileReader.result as string, maxImageSize).then(function afterImageDownscale(dataURL) {
        setPicture(dataURL)
      })
    }
  }
}

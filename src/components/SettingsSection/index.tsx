import Input from '../Input'
import Button from '../Button'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import Textarea from '../Textarea'
import { useContext, useEffect, useRef, useState } from 'react'
import { generateUniqueId, getProfileById } from '../../utils'
import { CurrentProfile, Profile } from '../../types'
import { UserContext } from '../../user-context'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../CardWrapper'
import MultilineInput from '../MultilineInput'

export default function SettingsSection() {
  const navigate = useNavigate()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageTakeInputRef = useRef<HTMLInputElement>(null)
  const bioInputRef = useRef<HTMLInputElement>(null)

  const defaultProfile: CurrentProfile = {
    id: '',
    username: '',
    profilePicture: '',
    tag: '',
    bio: '',
    followersIds: [],
    followingIds: [],
    posts: [],
    following: []
  }

  const ctx = useContext(UserContext)

  const [profile, setProfile] = useState<Profile>(ctx.currProfile || defaultProfile)

  useEffect(manageContextChange, [ctx])

  return (
    <div className={styles.main}>
    <CardWrapper>
      <div className={styles.container}>
        <ProfilePicture size='xxl' src={profile.profilePicture} />
        <div className={styles.buttonsContainer}>
          <Button width='150px' text='Upload picture' func={triggerImageUpload} />
          <input ref={fileInputRef} onChange={manageImageUpload} type='file' accept='image/*' style={{display: 'none'}} />
          <input ref={imageTakeInputRef} onChange={manageImageUpload} type='file' accept='image/*;capture=camera' style={{display: 'none'}} />
          <Button width='150px' text='Take picture' func={triggerImageTake} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>Username</div>
          <div className={styles.inputWrapper}>
            <Input value={profile.username} func={manageUsernameInputChange} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>Tag</div>
          <div className={styles.inputWrapper}>
            <Input value={profile.tag} func={manageTagInputChange} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>Bio</div>
          <div className={styles.inputWrapper}>
            <MultilineInput style={{padding: '0'}} reference={bioInputRef} defaultValue={profile.bio} />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button text='Undo' type={2} func={undoChanges} />
          <Button text='Save' func={saveChanges} />
        </div>
      </div>
    </CardWrapper>
    </div>
  )

  // *********************************

  function undoChanges() {
    if (ctx.currProfile) setProfile(ctx.currProfile)
    else setProfile(defaultProfile)
  }

  function manageContextChange() {
    if (ctx.currProfile) setProfile(ctx.currProfile)
  }

  async function saveChanges() {
    const requiredProfileKeys = [
      'username',
      'tag',
      'bio',
      'profilePicture'
    ]

    if (profile.username.trim().length === 0) {
      alert('Username cannot be empty')
      return
    }

    if (profile.tag.trim().length === 0) {
      alert('Tag cannot be empty')
      return
    }

    if (profile.tag.trim()[0] !== '@') {
      alert('Tag must start with "@"')
      return
    }

    
    if (profile.tag.trim().split('').filter(function filterAtSign(c: string) {return c === '@'}).length !== 1) {
      alert('Tag must contain exactly one "@" at the start')
      return
    }

    if (profile.tag.trim().split('').some(function findSpace(c: string) {return c === ' '})) {
      alert('Tag cannot contain spaces')
      return
    }

    let profileToPost = Object.fromEntries(Object.entries(profile).filter(entry => requiredProfileKeys.includes(entry[0])))
    profileToPost.bio = bioInputRef.current!.innerText

    const json = JSON.stringify(profileToPost)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${ctx.currUser?.uid}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await ctx.currUser?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status !== 200) alert(`Error: ${res.statusText}`)
    else {
      const newProfile = await getProfileById(ctx.currUser!.uid, ctx.currUser!)
      ctx.setCurrProfile(Object.assign(profile, newProfile))
      navigate('/')
    }
  }

  function triggerImageTake() {
    imageTakeInputRef.current!.click()
  }

  function triggerImageUpload() {
    // document.getElementById(profilePictureInputId)?.click()
    fileInputRef.current!.click()
  }

  function manageImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const maxWidth = 2000
    const maxHeight = 2000

    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        if (image.width > maxWidth || image.height > maxHeight) {
          alert(`Maximum image resolution allowed is ${maxWidth}x${maxHeight}px.\nYour image resolution is ${image.width}x${image.height}px.`)
          fileInputRef.current!.value = ''
        }
        else setProfilePicture(fileReader.result as string)
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }

  function setProfilePicture(newProfilePicture: string) {
    let newProfile = {...profile}
    newProfile.profilePicture = newProfilePicture
    setProfile(newProfile)
  }

  function setUsername(newUsername: string) {
    let newProfile = {...profile}
    newProfile.username = newUsername
    setProfile(newProfile)
  }

  function setTag(tag: string) {
    let newProfile = {...profile}
    newProfile.tag = tag
    setProfile(newProfile)
  }

  function setBio(bio: string) {
    let newProfile = {...profile}
    newProfile.bio = bio
    setProfile(newProfile)
  }

  function manageUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  function manageTagInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value)
  }

  function manageBioInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBio(e.target.value)
  }
}

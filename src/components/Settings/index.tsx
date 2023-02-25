import Input from '../Input'
import Button from '../Button'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import Textarea from '../Textarea'
import { useEffect, useState } from 'react'
import { generateUniqueId } from '../../utils'
import { Profile } from '../../types'

export default function Settings() {
  const [profilePictureInputId] = useState(generateUniqueId())
  const [profile, setProfile] = useState<Profile>({
    username: '',
    nFollowed: 0,
    nFollowers: 0,
    nPosts: 0,
    profilePicture: '',
    tag: '',
    bio: '',
  })

  return (
    <div className={styles.main}>
      <ProfilePicture size='xl' src={profile.profilePicture} />
      <div className={styles.buttonsContainer}>
        <Button width='150px' text='Upload picture' func={triggerImageUpload} />
        <input id={profilePictureInputId} onChange={manageImageUpload} type='file' accept='image/*' style={{display: 'none'}} /> 
        <Button width='150px' text='Take picture' />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Username</div>
        <Input value={profile.username} func={manageUsernameInputChange} />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Tag</div>
        <Input value={profile.tag} func={manageTagInputChange} />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Bio</div>
        <Textarea value={profile.bio} func={manageBioInputChange} />
      </div>
      <div className={styles.buttonsContainer}>
        <Button text='Undo' type={2} />
        <Button text='Save' />
      </div>
    </div>
  )

  // *********************************

  function triggerImageUpload() {
    document.getElementById(profilePictureInputId)?.click()
  }

  function manageImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('manageImageUpload')
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        console.log('onload')
        setProfilePicture(fileReader.result as string)
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

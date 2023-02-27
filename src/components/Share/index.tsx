import React, { useContext } from 'react'
import { UserContext } from '../../user-context'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

export default function Share() {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <ProfilePicture src={ctx.currProfile?.profilePicture} size='md' />
      <div className={styles.text}>
        Share something with the world...
      </div>
      <Button text='Share' />
    </div>
  )
}

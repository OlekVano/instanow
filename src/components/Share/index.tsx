import React, { MouseEventHandler, useContext, useState } from 'react'
import { ShareModalContext } from '../../share-modal-context'
import { UserContext } from '../../user-context'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import Modal from '../Modal'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

export default function Share() {
  const userCtx = useContext(UserContext)
  const shareModalCtx = useContext(ShareModalContext)

  return (
    <div className={styles.main} onClick={shareModalCtx.openModal as MouseEventHandler}>
      <ProfilePicture src={userCtx.currProfile?.profilePicture} size='md' />
      <div className={styles.text}>
        Share something with the world...
      </div>
      <Button text='Share' />
    </div>
  )
}

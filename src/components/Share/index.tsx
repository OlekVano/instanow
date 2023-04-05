import React, { MouseEventHandler, useContext, useState } from 'react'
import { ModalContext } from '../../modal-context'
import { UserContext } from '../../user-context'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import Modal from '../Modal'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import plus from '../../assets/plus.png'
import ButtonSmall from '../ButtonSmall'

export default function Share() {
  const userCtx = useContext(UserContext)
  const modalCtx = useContext(ModalContext)

  return (
    <div className={styles.main} onClick={openCreatePostModal as MouseEventHandler}>
      <ProfilePicture src={userCtx.currProfile?.profilePicture} size='md' />
      <div className={styles.text}>
        Share something...
      </div>
      <div className='d-md-none d-block'>
        <ButtonSmall image={plus} func={openCreatePostModal} />
      </div>
      <div className='d-none d-md-block'>
        <Button text='Share' />
      </div>
    </div>
  )

  // *********************************

  function openCreatePostModal() {
    modalCtx.setModal('CREATE_POST')
  }
}

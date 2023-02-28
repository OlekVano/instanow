import { useContext } from 'react';
import { UserContext } from '../../user-context';
import Button from '../Button';
import CardWrapper from '../CardWrapper';
import Modal from '../Modal';
import ProfilePicture from '../ProfilePicture';
import styles from './index.module.scss'
import picture from '../../assets/picture.png'
import { ShareModalContext } from '../../share-modal-context';

export default function CreatePostModal() {
  const userCtx = useContext(UserContext)
  const shareModalCtx = useContext(ShareModalContext)

  return (
    <Modal onExit={shareModalCtx.closeModal}>
      <CardWrapper>
        <div className={styles.main}>
          <div className={styles.container}>
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            <input placeholder="What's happening?" className={styles.input} />
          </div>
          <div className={styles.photoContainer}>
            <img src={picture} className={styles.image} />
            <div className={styles.buttonsContainer}>
              <Button text='Upload picture' width='150px' />
              <Button text='Take picture' width='150px' />
            </div>
          </div>
          <div className={styles.buttonsContainer2}>
            <Button text='Close' type={2} func={shareModalCtx.closeModal} />
            <Button text='Post' />
          </div>
        </div>
      </CardWrapper>
    </Modal>
  )
}

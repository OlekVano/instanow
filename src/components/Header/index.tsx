import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../../modal-context'
import { UserContext } from '../../user-context'
import Button from '../Button'
import LogoWithBrand from '../LogoWithBrand'
import ProfilePicture from '../ProfilePicture'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'

type Props = {
  rightSideEmpty?: boolean
}

export default function Header({ rightSideEmpty=false }: Props) {
  const userCtx = useContext(UserContext)
  const modalCtx = useContext(ModalContext)

  return (
    <header className={styles.main}>
      <div className={`container-xl ${styles.wrapper}`}>
        <LogoWithBrand />
        {
          rightSideEmpty || !userCtx.currProfile ? null
          : <>
            <div style={{flexGrow: 1}}></div>
            <SearchBar />
            <Button type={1} text='Create' func={openCreatePostModal} />
            <Link to={`/profiles/${userCtx.currUser?.uid}`}>
              <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
            </Link>
          </>
        }
      </div>
    </header>
  )

  // *****************************

  function openCreatePostModal() {
    modalCtx.setModal('CREATE_POST')
  }
}

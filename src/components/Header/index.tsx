import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../../modal-context'
import { UserContext } from '../../user-context'
import Button from '../Button'
import ButtonSmall from '../ButtonSmall'
import LogoWithBrand from '../LogoWithBrand'
import ProfilePicture from '../ProfilePicture'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'
import plus from '../../assets/plus.png'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'

type Props = {
  rightSideEmpty?: boolean,
  openMenu: Function,
  closeMenu: Function,
  showMenu: boolean
}

export default function Header({ rightSideEmpty=false, showMenu, openMenu, closeMenu }: Props) {
  const userCtx = useContext(UserContext)
  const modalCtx = useContext(ModalContext)

  return (
    <header className={styles.main}>
      <div className={`container-xl ${styles.container}`}>
        <LogoWithBrand />
        {
          rightSideEmpty || !userCtx.currProfile ? null
          : <>
            <div style={{flexGrow: 1}}></div>
            <div className='d-md-none d-block'>
              <ButtonSmall image={plus} func={openCreatePostModal} />
            </div>
            {
              showMenu ?
              <div className='d-md-none d-block'>
                <ButtonSmall type={2} image={close} func={closeMenu} />
              </div>
              :
              <div className='d-md-none d-block'>
                <ButtonSmall type={2} image={menu} func={openMenu} />
              </div>
            }
            {/* <div className='d-none d-md-block'><SearchBar /></div> */}
            <div className='d-none d-md-block'><Button type={1} text='Create' func={openCreatePostModal} /></div>
            <div className='d-none d-md-block'>
              <Link to={`/profiles/${userCtx.currUser?.uid}`}>
                <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
              </Link>
            </div>

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

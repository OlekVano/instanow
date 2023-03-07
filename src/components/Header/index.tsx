import { useContext } from 'react'
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

type Props = {
  rightSideEmpty?: boolean
}

export default function Header({ rightSideEmpty=false }: Props) {
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
              {/* <Button text='+' width='44px' func={openCreatePostModal} /> */}
              <ButtonSmall image={plus} func={openCreatePostModal} />
            </div>

            <div className='d-none d-md-block'><SearchBar /></div>
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

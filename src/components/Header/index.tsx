import { useContext } from 'react'
import { ShareModalContext } from '../../share-modal-context'
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
  const shareModalCtx = useContext(ShareModalContext)

  return (
    <header className={styles.main}>
      <div className={`container-xl ${styles.wrapper}`}>
        <LogoWithBrand />
        {
          rightSideEmpty || !userCtx.currProfile ? null
          : <>
            <div style={{flexGrow: 1}}></div>
            <SearchBar />
            <Button type={1} text='Create' func={shareModalCtx.openModal} />
            <ProfilePicture size='md' src={userCtx.currProfile?.profilePicture} />
          </>
        }
        
      </div>
    </header>
  )
}

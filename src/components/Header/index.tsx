import Button from '../Button'
import LogoWithBrand from '../LogoWithBrand'
import ProfilePicture from '../ProfilePicture'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'

type Props = {
  rightSideEmpty?: boolean
}

export default function Header({ rightSideEmpty=false }: Props) {
  return (
    <header className={styles.main}>
      <div className={`container-xl ${styles.wrapper}`}>
        <LogoWithBrand />
        {
          rightSideEmpty ? null
          : <>
            <div style={{flexGrow: 1}}></div>
            <SearchBar />
            <Button type={1} text='Create' />
            <ProfilePicture />
          </>
        }
        
      </div>
    </header>
  )
}

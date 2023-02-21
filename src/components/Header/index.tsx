import Button from '../Button'
import LogoWithBrand from '../LogoWithBrand'
import ProfilePicture from '../ProfilePicture'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'


export default function Header() {
  return (
    <header className={styles.main}>
      <LogoWithBrand />
      <div style={{flexGrow: 1}}></div>
      <SearchBar />
      <Button type={1} text='Create' />
      <ProfilePicture />
    </header>
  )
}

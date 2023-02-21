import Button from '../Button'
import LogoWithBrand from '../LogoWithBrand'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'
import profilePicture from '../../assets/laura.png'

export default function Header() {
  return (
    <header className={styles.main}>
      <LogoWithBrand />
      <div style={{flexGrow: 1}}></div>
      <SearchBar />
      <Button type={1} text='Create' />
      <img className={styles.profilePicture} src={profilePicture} />
    </header>
  )
}

// Logo With Brand

import styles from './index.module.scss'
import Logo from '../Logo'

export default function LogoWithBrand() {
  return (
    <div className={styles.main}>
      <Logo />
      <h1 className={styles.brand}>Instanow</h1>
    </div>
  )
}
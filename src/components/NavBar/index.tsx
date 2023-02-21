import styles from './index.module.scss'
import NavButton from '../NavButton'
import house from '../../assets/home.png'
import profile from '../../assets/profile.png'
import messages from '../../assets/messages.png'
import people from '../../assets/people.png'
import settings from '../../assets/settings.png'
import logout from '../../assets/logout.png'
import Line from '../Line'

export default function NavBar() {
  return (
    <div className={styles.main}>
      <NavButton text={'Home'} image={house} selected={true} roundedTop={true} />
      <NavButton text={'Profile'} image={profile} selected={false} />
      <NavButton text={'Messages'} image={messages} selected={false} />
      <NavButton text={'People'} image={people} selected={false} />
      <div style={{width: '80%', margin: '0 auto'}}>
        <Line />
      </div>
      <NavButton text={'Settings'} image={settings} selected={false} />
      <NavButton text={'Logout'} image={logout} selected={false} />
    </div>
  )
}
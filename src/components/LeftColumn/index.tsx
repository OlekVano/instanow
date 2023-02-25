import { UserContextState } from '../../types'
import Consumer from '../../UserContext'
import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

export default function LeftColumn() {
  return (
    <Consumer>
      {function renderFromContext(ctx: UserContextState | undefined) {
        return (
          <div className={styles.main}>
            {
              !ctx?.currProfile ? null :
              <div className={styles.profileWrapper}>
                <ProfileMedium />
              </div>
            }

            <NavBar />
          </div>
        )
      }}
    </Consumer>
  )
}

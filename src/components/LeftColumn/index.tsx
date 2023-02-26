import { UserContextType } from '../../types'
import { UserContext } from '../../user-context'
import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

export default function LeftColumn() {
  return (
    <UserContext.Consumer>
      {function renderFromContext(ctx: UserContextType) {
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
    </UserContext.Consumer>
  )
}

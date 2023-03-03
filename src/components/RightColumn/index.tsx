import { UserContextType } from '../../types'
import { UserContext } from '../../user-context'
import Following from '../Following'
import NewMessages from '../NewMessages'
import styles from './index.module.scss'

export default function RightColumn() {
  return (
    <UserContext.Consumer>
      {function renderFromContext(ctx: UserContextType) {
        return (
          <div className={styles.main}>
            {
              !ctx?.currProfile ? null :
              <>
                {/* <NewMessages />
                <Following /> */}
              </>
            }
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}

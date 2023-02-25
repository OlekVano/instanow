import { UserContextState } from '../../types'
import Consumer from '../../UserContext'
import Following from '../Following'
import NewMessages from '../NewMessages'
import styles from './index.module.scss'

export default function RightColumn() {
  return (
    <Consumer>
      {function renderFromContext(ctx: UserContextState | undefined) {
        return (
          <div className={styles.main}>
            {
              !ctx?.currProfile ? null :
              <>
                <NewMessages />
                <Following />
              </>
            }
          </div>
        )
      }}
    </Consumer>
  )
}

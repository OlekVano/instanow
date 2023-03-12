import { useContext, useEffect } from 'react'
import { UserContextType } from '../../types'
import { UserContext } from '../../user-context'
import Following from '../Following'
import NewMessages from '../NewMessages'
import styles from './index.module.scss'

export default function RightColumn() {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      {
        ctx?.currProfile ? <Following profile={ctx.currProfile} /> : null
      }
    </div>
  )
}

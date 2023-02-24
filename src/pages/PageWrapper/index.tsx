import { Outlet } from 'react-router-dom'
import LeftColumn from '../../components/LeftColumn'
import RightColumn from '../../components/RightColumn'
import styles from './index.module.scss'

export default function PageWrapper() {
  return (
    <div className={`container-xl ${styles.container}`}>
      <div className='row' style={{width: '100%'}}>
        <div className='col-3'><LeftColumn /></div>
        <Outlet />
        <div className='col-3'><RightColumn /></div>
      </div>
    </div>
  )
}

import { Filter } from '../../types'
import styles from './index.module.scss'

type Props = {
  img: string,
  setFilter: Function,
  filter: Filter
}

export default function Filters({ img, setFilter, filter }: Props) {
  return (
    <div className={styles.main}>
      <div className={`${styles.imageContainer} ${filter === 1 ? styles.selected : ''}`} onClick={function changeFilter1() {setFilter(1)}}>
        <img src={img} className={`${styles.image} ${styles.filter1}`} />
      </div>
      <div className={`${styles.imageContainer} ${filter === 2 ? styles.selected : ''}`} onClick={function changeFilter2() {setFilter(2)}}>
        <img src={img} className={`${styles.image} ${styles.filter2}`} />
      </div>
      <div className={`${styles.imageContainer} ${filter === 3 ? styles.selected : ''}`} onClick={function changeFilter3() {setFilter(3)}}>
        <img src={img} className={`${styles.image} ${styles.filter3}`} />
      </div>
      <div className={`${styles.imageContainer} ${filter === 4 ? styles.selected : ''}`} onClick={function changeFilter4() {setFilter(4)}}>
        <img src={img} className={`${styles.image} ${styles.filter4}`} />
      </div>
      <div className={`${styles.imageContainer} ${filter === 5 ? styles.selected : ''}`} onClick={function changeFilter5() {setFilter(5)}}>
        <img src={img} className={`${styles.image} ${styles.filter5}`} />
      </div>
    </div>
  )
}

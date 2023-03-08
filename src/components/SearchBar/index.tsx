import styles from './index.module.scss'

type Props = {
  width?: string
}

export default function SearchBar({ width='300px' }: Props) {
  return (
    <div style={{width: width}} className={styles.main}>Search for someone...</div>
  )
}

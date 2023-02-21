import styles from './index.module.scss'

type Props = {
  image: string,
  text: string,
  selected: boolean,
  roundedTop?: boolean
}

export default function NavButton({ image, text, selected, roundedTop=false }: Props) {
  return (
    <div className={`${styles.main} ${selected ? styles.selected : ''} ${roundedTop ? styles.roundedTop : ''}`}>
      <img src={image} className={styles.image} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}
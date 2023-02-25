import Input from '../../components/Input'
import Button from '../../components/Button'
import ProfilePicture from '../../components/ProfilePicture'
import styles from './index.module.scss'
import Textarea from '../../components/Textarea'

export default function Settings() {
  return (
  <div className={styles.main}>
    <ProfilePicture size='xl' />
    <div className={styles.buttonsContainer}>
      <Button width='150px' text='Upload picture' />
      <Button width='150px' text='Take picture' />
    </div>
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Username</div>
      <Input defaultValue='Laura Fitscher' />
    </div>
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Tag</div>
      <Input defaultValue='@laurafitscher' />
    </div>
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Bio</div>
      <Textarea defaultValue='Loves cats. Cats are my life and passion, My cats are as important as my family members to me. #cats #catlover' />
    </div>
    <div className={styles.buttonsContainer}>
      <Button text='Undo' type={2} />
      <Button text='Save' />
    </div>
  </div>
  )
}

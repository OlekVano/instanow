import { FormEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useState } from 'react'
import { generateUniqueId } from '../../utils'
import  styles from './index.module.scss'

type Props = {
  onInput?: Function,
  defaultValue?: string,
}

export default function MultilineInput({ onInput=function(){}, defaultValue='' }: Props) {
  return (
    <div className={styles.main} onInput={onInput as FormEventHandler} suppressContentEditableWarning={true} contentEditable>{defaultValue}</div>
  )
}

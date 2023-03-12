import { CSSProperties, FormEventHandler, ReactEventHandler, RefObject, SyntheticEvent, useEffect, useState } from 'react'
import { generateUniqueId } from '../../utils'
import  styles from './index.module.scss'

type Props = {
  onInput?: Function,
  defaultValue?: string,
  reference?: RefObject<HTMLDivElement>,
  style?: CSSProperties
}

export default function MultilineInput({ onInput=function(){}, defaultValue='', reference, style }: Props) {
  return (
    <div ref={reference} style={style} className={styles.main} onInput={onInput as FormEventHandler} suppressContentEditableWarning={true} contentEditable>{defaultValue}</div>
  )
}

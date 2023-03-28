import { CSSProperties, FocusEventHandler, FormEventHandler, MouseEventHandler, ReactEventHandler, RefObject, SyntheticEvent, useEffect, useState } from 'react'
import  styles from './index.module.scss'

type Props = {
  onInput?: Function,
  defaultValue?: string,
  reference?: RefObject<HTMLDivElement>,
  style?: CSSProperties,
  onFocus?: Function,
  onBlur?: Function
}

export default function MultilineInput({ onInput=function(){}, defaultValue='', reference, style, onFocus=function(){}, onBlur=function(){} }: Props) {
  return (
    <div ref={reference} style={style} onBlur={onBlur as FormEventHandler} onFocus={onFocus as FocusEventHandler} className={styles.main} onInput={onInput as FormEventHandler} suppressContentEditableWarning={true} contentEditable>{defaultValue}</div>
  )
}

import styles from './index.module.scss'
import { EventHandler, MouseEvent, MouseEventHandler, PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  onExit?: Function
}

export default function Modal({ children, onExit=function(){} }: PropsWithChildren & Props) {
  const elRef = useRef<HTMLDivElement | null>(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect(function manageModal() {
    const modalRoot = document.getElementById('modal') as HTMLElement
    modalRoot?.appendChild(elRef.current as Node)
    // Disable scrolling while modal is visible
    document.body.style.overflow = 'hidden'



    return function removeModal() {
      modalRoot?.removeChild(elRef.current as Node)
      document.body.style.overflow = 'auto'
    }
  }, [])

  return createPortal(<div className={styles.main} onClick={onClick}>{children}</div>, elRef.current as HTMLElement)

  // ****************************

  function onClick(e: MouseEvent) {
    // If clicked outside of the modal
    if (!elRef.current?.firstChild?.firstChild?.contains(e.target as Node)) {
      onExit()
    }
  }
}
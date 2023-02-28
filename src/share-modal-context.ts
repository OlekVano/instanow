import { createContext } from 'react'
import { ShareModalContextType } from './types'

export const ShareModalContext = createContext<ShareModalContextType>({
  closeModal: function(){},
  openModal: function(){}
})
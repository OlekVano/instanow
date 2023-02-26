import { createContext } from 'react'
import { UserContextType } from './types'

export const UserContext = createContext<UserContextType>({
  currProfile: undefined,
  currUser: undefined,
  setCurrProfile: function(){}
})
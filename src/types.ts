import { User } from "firebase/auth"

export type Profile = {
  profilePicture: string,
  username: string,
  tag: string,
  bio: string,
  followers: string[],
  following: string[],
  posts: string[]
}

export type UserContextType = {
  currProfile: Profile | undefined,
  currUser: User | undefined | null,
  setCurrProfile: Function
}

export type ShareModalContextType = {
  openModal: Function,
  closeModal: Function
}
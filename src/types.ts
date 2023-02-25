import { User } from "firebase/auth"

export type Profile = {
  username: string,
  tag: string,
  bio: string,
  nFollowers: number,
  nFollowed: number,
  nPosts: number
}

export type UserContextState = {
  currUser?: User,
  currProfile?: Profile
  setCurrUser: Function,
  setCurrProfile: Function
}
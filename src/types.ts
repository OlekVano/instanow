import { User } from "firebase/auth"

export type Profile = {
  profilePicture: string,
  username: string,
  tag: string,
  bio: string,
  nFollowers: number,
  nFollowed: number,
  nPosts: number
}

export type UserContextType = {
  currProfile: Profile | undefined,
  currUser: User | undefined | null,
  setCurrProfile: Function
}
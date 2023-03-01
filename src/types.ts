import { User } from "firebase/auth"

export type Profile = {
  profilePicture: string,
  username: string,
  tag: string,
  bio: string,
  followers: string[],
  following: string[],
  posts: PostWithoutAuthor[]
}

export type Post = {
  author: ProfileWithoutPosts,
  authorId: string,
  comments: Object[],
  likes: string[],
  picture: string,
  text: string
}

export type PostWithoutAuthor = Omit<Post, 'author'>

export type ProfileWithoutPosts = Omit<Profile, 'posts'>

export type UserContextType = {
  currProfile: Profile | undefined,
  currUser: User | undefined | null,
  setCurrProfile: Function
}

export type ShareModalContextType = {
  openModal: Function,
  closeModal: Function
}
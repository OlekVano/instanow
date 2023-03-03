import { User } from 'firebase/auth'

export type Profile = {
  profilePicture: string,
  username: string,
  tag: string,
  bio: string,
  followers: string[],
  following: string[],
  posts: PostWithoutAuthor[],
}

export type Post = {
  id: string,
  author: ProfileWithoutPosts,
  authorId: string,
  comments: Comment[],
  likes: string[],
  picture: string,
  text: string,
  createdAt: number
}

export type PostWithoutAuthor = Omit<Post, 'author' | 'comments'> & {comments: CommentWithoutAuthor[]}

export type Comment = {
  text: string,
  authorId: string,
  comments: Comment[],
  author: Profile,
  createdAt: number
}

export type CommentWithoutAuthor = Omit<Comment, 'author'>

export type ProfileWithoutPosts = Omit<Profile, 'posts'>

export type UserContextType = {
  currProfile: Profile | undefined,
  currUser: User | undefined | null,
  setCurrProfile: Function
}

export type ModalContextType = {
  setModal: Function
}

export type WithComments = {comments: Comment[]} & {[key: string]: any}
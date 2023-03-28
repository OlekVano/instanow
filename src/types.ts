import { User } from 'firebase/auth'

export type Profile = {
  id: string,
  profilePicture: string,
  username: string,
  tag: string,
  bio: string,
  followersIds: string[],
  followingIds: string[],
  posts: PostWithoutAuthor[],
}

export type CurrentProfile = Profile & {
  following: ProfileWithoutPosts[]
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

export type PostWithoutAuthor = Omit<Post, 'author'> & {comments: CommentWithoutAuthor[]}

export type Comment = {
  text: string,
  authorId: string,
  comments: Comment[],
  author: Profile,
  createdAt: number,
  likes: string[]
}

export type CommentWithoutAuthor = Omit<Comment, 'author'>

export type ProfileWithoutPosts = Omit<Profile, 'posts'>

export type UserContextType = {
  currProfile: CurrentProfile | undefined,
  currUser: User | undefined | null,
  setCurrProfile: Function,
  chats: Chat[],
  setChats: Function
}

export type ModalContextType = {
  setModal: Function
}

export type WithComments = {comments: Comment[]} & {[key: string]: any}

export type Chat = {
  user: ProfileWithoutPosts,
  id: string,
  userIds: string[],
  messages: Message[]
}

export type Message = {
  authorId: string,
  read: boolean,
  text: string,
  image: string
}
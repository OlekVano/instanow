import { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Chat, Message } from '../../types'
import { UserContext } from '../../user-context'
import { getProfileById, getFollowedProfiles, getChats } from '../../utils'
import LeftColumn from '../LeftColumn'
import NotLoggedInSection from '../NotLoggedInSection'
import RightColumn from '../RightColumn'
import styles from './index.module.scss'

export default function PageWrapper() {
  const userCtx = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [socket, setSocket] = useState<WebSocket>()

  const chatsRef = useRef<Chat[]>(userCtx.chats)

  useEffect(manageAccountChange, [userCtx.currUser])
  useEffect(manageChatsChange, [userCtx.chats])

  if (!userCtx.currUser) {
    return <NotLoggedInSection />
  }

  return (
    <div className={`container-xl`}>
      <div className={`row gx-5 ${styles.row}`}>
        <div className={`d-none d-md-block col-4 col-lg-3`}>
          {
            !userCtx.currProfile ? null : <div className={`sticky-top ${styles.stickyCol} ${styles.paddingTop}`} >
              <LeftColumn />
            </div>
          }
        </div>
        <div className={`${styles.paddingTop} ${location.pathname.startsWith('/messages') ? `${styles.messagesPage} col-12 col-md-8 col-lg-9` : 'col-12 col-md-8 col-lg-9 col-xl-6'} ${location.pathname === '/people' ? styles.heightScreen : ''}`}>
          <Outlet />
        </div>
        {
          location.pathname.startsWith('/messages') ? null :
          <div className={`col-3 d-none d-xl-block`}>
            <div className={`sticky-top ${styles.stickyCol} ${styles.paddingTop}`}>
              <RightColumn />
            </div>
          </div>
        }
      </div>
    </div>
  )

  // **************************************

  function manageChatsChange() {
    chatsRef.current = userCtx.chats
  }

  function manageAccountChange() {
    if (!userCtx.currUser) return
    getProfileById(userCtx.currUser.uid, userCtx.currUser).then(async function afterGotProfile(profile) {
      if (!profile) navigate('/settings')
      else userCtx.setCurrProfile(Object.assign({
        following: await getFollowedProfiles(userCtx.currUser!) || []
      }, profile))
    })
    getChats(userCtx.currUser).then(async function afterGotChats(chats) {
      userCtx.setChats(chats || [])
    })

    initWebSocket()
  }

  function initWebSocket() {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL)

    socket.addEventListener('open', async function onSocketOpen() {
      socket.send(await userCtx.currUser!.getIdToken())
      setSocket(socket)
    })

    socket.addEventListener('message', onSocketMessage)
  }

  function onSocketMessage(event: any) {
    const message: Message = JSON.parse(event.data)
    let newChats = [...chatsRef.current]
    newChats.find(findChat)!.messages.push(message)
    userCtx.setChats(newChats)

    function findChat(chat: Chat) {
      return chat.userIds.includes(message.authorId)
    }
  }
}

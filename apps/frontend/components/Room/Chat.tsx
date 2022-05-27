import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatMessage, PlaylistItem } from '../../common/graphql/schema'
import { useAuthContext } from '../../context/AuthContext'
import { useChat } from '../../hooks/rooms/useChat'
import SoundCard from '../marketplace/SoundCard'
import { ProfileName } from '../profile'
import cn from 'classnames'
import s from './Chat.module.css'

type ChatProps = {
  className?: string
  chat: ChatMessage[]
  roomId: string
}

export const Chat: FC<ChatProps> = ({ chat, className, roomId }) => {
  const [chatMessage, setChatMessage] = useState<string>('')
  const { createChatMessage } = useChat()
  const { authUser } = useAuthContext()
  const [userChat, setUserChat] = useState<ChatMessage[]>(chat)
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setUserChat(chat)
    scrollToBottom()
  }, [chat])

  const handleCreateChatMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) {
      return
    }
    setChatMessage(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  const sendChatMessage = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.code === 'Enter' &&
      chatMessage.length > 0 &&
      chatMessage.length <= 250
    ) {
      setLoading(true)
      setUserChat([...userChat, { message: chatMessage, sender: authUser }])
      createChatMessage({ message: chatMessage, roomId })
      setChatMessage('')
      scrollToBottom()

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true)
        }, 500)
      )
      setLoading(false)
    }
  }

  return (
    <div className={cn(s.root, '', className)}>
      <div className="flex flex-col w-[400px] h-screen">
        <div
          className={cn(
            s.bgDark,
            'text-white font-bold text-md text-center py-4 border-b-1 border-b border-grey-light bg-grey-dark pt-4'
          )}
        >
          {roomId === '' ? 'Community' : 'Room'} Chat
        </div>
        <div
          className={cn(
            s.bgDark,
            'text-white p-5 overflow-y-auto bg-grey-dark h-full'
          )}
        >
          {userChat.map((chatMessage, key) => {
            return (
              <div key={key}>
                <ProfileName
                  ethAddress={chatMessage.sender.ethAddress}
                  name={chatMessage.sender.name}
                  short={true}
                  className="inline-block font-bold"
                />
                : <span className="break-words">{chatMessage.message}</span>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
        <div
          className={cn(
            s.bgDark,
            'py-4 border-t border-t-1 border-grey-light w-full mt-auto mb-[172px] bg-grey-dark '
          )}
        >
          <div
            className={cn(
              'flex justify-center items-center content-center bg-grey-dark pt-5 pb-5'
            )}
          >
            <input
              type="text"
              disabled={authUser ? false : true}
              maxLength={250}
              minLength={1}
              onChange={handleCreateChatMessage}
              placeholder={`${
                loading
                  ? 'Hold on...'
                  : !authUser
                  ? 'Login to chat'
                  : 'Send a message'
              }`}
              onKeyDown={sendChatMessage}
              value={chatMessage}
              className="p-3 bg-grey-medium text-grey-light rounded-2xl w-full text-base mx-10 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatMessage, PlaylistItem } from '../../common/graphql/schema'
import { useAuthContext } from '../../context/AuthContext'
import { useChat } from '../../hooks/rooms/useChat'
import SoundCard from '../marketplace/SoundCard'
import { ProfileName } from '../profile'
import cn from 'classnames'
import s from './Chat.module.css'
import { useAudioContext } from '../../context/AudioContext'
import Link from 'next/link'
import useWindowDimensions from '../../hooks/useWindowDimensions'

type ChatProps = {
  className?: string
  chat?: ChatMessage[]
  roomId: string
}

export const Chat: FC<ChatProps> = ({ chat, className, roomId }) => {
  const [chatMessage, setChatMessage] = useState<string>('')
  const { createChatMessage } = useChat()
  const { authUser } = useAuthContext()
  const [userChat, setUserChat] = useState<ChatMessage[]>(chat)
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef = useRef(null)
  const { currentTrack } = useAudioContext()
  const { isResponsive } = useWindowDimensions()
  const [showChat, setShowChat] = useState<boolean>(false)

  let marginBottom

  if (currentTrack.visible) {
    marginBottom = isResponsive ? 'mb-[100px]' : 'mb-[202px]'
  } else {
    marginBottom = isResponsive ? 'mb-[40px]' : 'mb-[160px]'
  }

  function generateUserColor(ethAddress) {
    return '#' + ethAddress.substring(36, 42)
  }

  useEffect(() => {
    if(!showChat && isResponsive){
      return;
    }
    scrollToBottom()
  }, [userChat])

  useEffect(() => {
    if (!chat) {
      return
    }
    setUserChat(chat)
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
      // setUserChat([...userChat, { message: chatMessage, sender: authUser }])
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
    <>
      {((isResponsive && showChat) || !isResponsive) && (
        <div className={cn(s.root, className)}>
          <div className={cn(s.chatWrapper)}>
            <div className={cn(s.chatHeading, s.boxShadow)}>
              {roomId === '' ? 'Community' : 'Room'} Chat
            </div>
            <div className={cn(s.chatMessages, s.boxShadow)}>
              {userChat?.map((chatMessage, key) => {
                return (
                  <div key={key} className="mb-2">
                    <Link href={`/profile/${chatMessage.sender.ethAddress}`}>
                      <a>
                        <ProfileName
                          ethAddress={chatMessage.sender.ethAddress}
                          name={chatMessage.sender.name}
                          short={true}
                          className="inline-block font-bold"
                          color={generateUserColor(
                            chatMessage.sender.ethAddress
                          )}
                          fullName={true}
                        />
                      </a>
                    </Link>
                    : <span className="break-words">{chatMessage.message}</span>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className={cn(s.chatInputWrapper, s.boxShadow, marginBottom)}>
              <div className={cn(s.chatInput)}>
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
                      ? 'Login to chat...'
                      : 'Send a message...'
                  }`}
                  onKeyDown={sendChatMessage}
                  value={chatMessage}
                  className="p-2 bg-grey-medium text-white rounded-lg w-11/12 text-xs mx-2 h-8 placeholder-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isResponsive && (
        <div
          className={cn(s.mobileChatButton, currentTrack?.visible && s.mobileChatButtonMargin)}
          onClick={() => setShowChat(!showChat)}
        >
          <button>{!showChat ? 'Open' : 'Close'} Chat</button>
        </div>
      )}
    </>
  )
}

import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatMessage, PlaylistItem } from '../../common/graphql/schema'
import { useAuthContext } from '../../context/AuthContext'
import { useChat } from '../../hooks/rooms/useChat'
import SoundCard from '../marketplace/SoundCard'
import { ProfileName } from '../profile'

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
    setChatMessage(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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
      await createChatMessage({ message: chatMessage, roomId })
      setChatMessage('')
      scrollToBottom()

      // await new Promise((resolve) =>
      //   setTimeout(() => {
      //     resolve(true)
      //   }, 2000)
      // )
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-col w-[400px] bg-grey-dark h-full rounded-2xl max-h-[900px]">
        <div className="text-white font-bold text-xl text-center py-5 border-b-1 border-b border-grey-light">
          Community Chat
        </div>
        <div className="text-white p-5 overflow-y-auto">
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
        <div className="py-5 border-t border-t-1 border-grey-light w-full mt-auto mb-3">
          <div className="flex justify-center items-center content-center">
            <input
              type="text"
              // disabled={loading}
              maxLength={250}
              minLength={1}
              onChange={handleCreateChatMessage}
              placeholder={`${loading ? 'Hold on...' : 'Send a message'}`}
              onKeyDown={sendChatMessage}
              value={chatMessage}
              className="text-center bg-grey-medium text-grey-light rounded-2xl w-full mx-10 h-12"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

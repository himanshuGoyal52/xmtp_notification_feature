import { Message } from '@xmtp/xmtp-js'
import { useCallback, useReducer } from 'react'
import { MessageStoreEvent } from '../contexts/xmtp'
import useXmtp from '../hooks/useXmtp'

type MessageDeduper = (message: Message) => boolean
type MessageStore = { [address: string]: Message[] }

const buildMessageDeduper = (state: Message[]): MessageDeduper => {
  const existingMessageKeys = state.map((msg) => msg.id)

  return (msg: Message) => existingMessageKeys.indexOf(msg.id) === -1
}

function showNotification(msg: string, id: string) {
  console.log(msg, id)
  navigator.serviceWorker.controller?.postMessage({ msg: msg, id: id })
}

const useMessageStore = () => {
  const { walletAddress } = useXmtp()

  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { peerAddress, messages }: MessageStoreEvent) => {
      const existing = state[peerAddress] || []
      const newMessages = messages.filter(buildMessageDeduper(existing))

      const newMsgLen: number = newMessages.length
      if (
        newMsgLen > 0 &&
        Object.keys(state).length > 0 &&
        location.href.includes(peerAddress)
      ) {
        showNotification(newMessages[0].content, newMessages[0].id)
      }

      // console.log('=================', newMessages[0]?.senderAddress)
      console.log('=================', newMessages[0]?.senderAddress)

      if (!newMessages.length) {
        return state
      }
      console.log('Dispatching new messages for peer address', peerAddress)

      return {
        ...state,
        [peerAddress]: existing.concat(newMessages),
      }
    },
    {}
  )

  const getMessages = useCallback(
    (peerAddress: string) => messageStore[peerAddress] || [],
    [messageStore]
  )

  return {
    getMessages,
    dispatchMessages,
  }
}

export default useMessageStore

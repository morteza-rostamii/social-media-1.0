import React from 'react'

const ChatApp = () => {
  return (
    <div>
      <h1>chat app</h1>
      <div
      className='
      flex gap-8
      '
      >
        <div
        className='
        bg-blue-100
        '
        >
        <h2>user 1</h2>
        </div>
        <div
        className='
        bg-green-100
        '
        >
        <h2>user 2</h2>
        </div>
      </div>
    </div>
  )
}

export default ChatApp
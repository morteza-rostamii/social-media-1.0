import React from 'react'
import InputComment from './InputComment'
import ListComments from './ListComments'

const Comments = ({
  postId
}) => {
  return (
    <div
    className='
    flex flex-col gap-8
    mb-4 border-t-2 pt-3 h-full
    '
    >
      {/* comment input */}
      <InputComment postId={postId}/>
      {/* comments section */}
      <ListComments postId={postId}/>
    </div>
  )
}

export default Comments
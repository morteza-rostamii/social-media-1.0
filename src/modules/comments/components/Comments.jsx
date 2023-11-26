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
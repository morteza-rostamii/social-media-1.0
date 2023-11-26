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
    mb-96
    '
    >
      {/* comments section */}
      <ListComments postId={postId}/>
      {/* comment input */}
      <InputComment postId={postId}/>
    </div>
  )
}

export default Comments
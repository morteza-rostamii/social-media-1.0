import React from 'react'

import {Avatar, Button, IconButton} from '@chakra-ui/react'
import InputComment from './InputComment'
import { truncateText } from '@/gg/utils/utils.editData'
import InputReply from './InputReply'
import CardReply from './CardReply'

const CardComment = ({
  type='',
  comment,
  comments,
  postId,
}) => {

  console.log('CardComment: ', comments);
  function renderReplies() {

    const replies = comments.filter((reply) => {
      //console.log(reply , comment.id)
      return reply.parent === comment.id;
    })

    return (
      replies && replies.length
      ?(
        <div
        id='replies'
        className='
        flex flex-col gap-4
        pl-6 border-l-2
        '
        >
          {
            replies.map((reply) => (
              <CardComment
              type='reply'
              key={reply.id}
              comment={reply}
              comments={comments}
              postId={postId}
              />
            ))
          }
        </div>
      ):(
        <></>
      )
    )
  }
  
  return (
    <div
    id='card-comment'
    className={`
    flex flex-col gap-3 rounded-md
    ${type !== 'reply' ? 'p-4' : ''}
    `}
    >
      <div
      id='card-comment-top'
      className='
      flex gap-6 items-center mt-2
      bg-white p-2 rounded-md
      '
      >
        <p
        className={`
        flex-1
        text-gray-600
        ${type !== 'reply' ? 'font-semibold text-black' : ''}
        `}
        >
          {comment.body}
        </p>
        <InputReply
        postId={postId}
        parentId={comment.id}
        />
      </div>
      {renderReplies()}
    </div>
  )
}

export default CardComment
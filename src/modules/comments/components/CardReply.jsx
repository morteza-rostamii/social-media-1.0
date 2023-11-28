import React from 'react'

import {Avatar, Button, IconButton} from '@chakra-ui/react'
//import InputComment from './InputComment'
import { truncateText } from '@/gg/utils/utils.editData'
//import InputReply from './InputReply'

const CardReply = ({
  comment,
  comments,
  postId,
}) => {

  return (
    <div
    id='reply-comment'
    className='
    
    bg-red-50 p-3 rounded-md
    '
    >s
      <div
      className='
      #flex gap-6 items-center
      '
      >sdsd
        {/* <p
        className='
        flex-1
        '
        >
          {comment.body}
        </p> */}
        {/* <InputReply
        postId={postId}
        parentId={comment.id}
        /> */}
      </div>
    </div>
  )
}

export default CardReply
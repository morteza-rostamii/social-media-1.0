import React from 'react'

import {Avatar, Button, IconButton} from '@chakra-ui/react'
import InputComment from './InputComment'
import { truncateText } from '@/gg/utils/utils.editData'

const CardComment = ({
  comment,
  postId,
}) => {

  console.log('c------', comment.parent)

  //if (!comment.parent.body) return <>loading..</> 

  return (
    <div
    className='
    flex gap-6 items-center
    bg-white p-3 rounded-md
    '
    >
      <div><Avatar src={comment?.user?.avatar || ''} alt='comment'/></div>

      <div>
        <div
        className='
        text-blue-500
        '
        >
          {
            comment?.parent?.body
            ? `reply to: ${truncateText(comment.parent.body, 50)}`
            : ''
          }
        </div>
        <div>
          date
        </div>
        <div>
          {comment.body}
        </div>
        <div>
          {/* <Button>
            reply
          </Button> */}

          <InputComment 
          postId={postId}
          parentId={comment.id}
          />
        </div>
      </div>

    </div>
  )
}

export default CardComment
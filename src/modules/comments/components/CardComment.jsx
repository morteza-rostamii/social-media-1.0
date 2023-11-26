import React from 'react'

import {Avatar, Button, IconButton} from '@chakra-ui/react'

const CardComment = ({
  comment,
}) => {
  return (
    <div
    className='
    flex gap-6 items-center
    bg-white p-3 rounded-md
    '
    >
      <div><Avatar src={comment?.user?.avatar || ''} alt='comment'/></div>

      <div>
        <div>
          date
        </div>
        <div>
          {comment.body}
        </div>
        <div>
          <Button>
            reply
          </Button>
        </div>
      </div>

    </div>
  )
}

export default CardComment
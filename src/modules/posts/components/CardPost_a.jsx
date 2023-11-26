import React from 'react'

// components
import {Button} from '@chakra-ui/react'
import { HiMiniHandThumbUp } from "react-icons/hi2";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import {Link} from 'react-router-dom'

const CardPost_a = ({
  post,
}) => {
  return (
    <div
    id='card-post-a'
    className='
    rounded-md overflow-hidden max-w-sm
    '
    >
      <div
      id='card-post-img-container'
      className='
      relative
      #max-h-96 overflow-hidden w-full
      mb-2
      '
      style={{
        maxHeight: '800px'
      }}
      >
        <Link
        to={`/posts/${post.id}`}
        >
          <img 
          className='
          aspect-square
          object-cover
          w-full
          '
          src={post?.img || 'https://placehold.co/400'} 
          alt="" />
        </Link>

        {/* actions */}
        <div
        className='
        absolute bottom-0 left-0 bg-white w-full
        p-2
        '        
        >
          <Button
          className='
          flex gap-3 items-center
          '
          variant='ghost'
          >
            <HiMiniHandThumbUp/>
            <span>3</span>
          </Button>
          <Button
          className='
          flex gap-3 items-center
          '
          variant='ghost'
          >
            <HiChatBubbleLeftRight/>
            <span>43</span>
          </Button>
        </div>
      </div>

      <div
      id='card-post-a-footer'
      className='
      p-6
      '
      >
        <p
        className='
        text-gray-700
        '
        >
          {post?.body}
        </p>
      </div>
    </div>
  )
}

export default CardPost_a
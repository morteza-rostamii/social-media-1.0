import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {useState} from 'react'

// components
import {Button, Avatar, IconButton} from '@chakra-ui/react'
import { HiMiniHandThumbUp } from "react-icons/hi2";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import {Link} from 'react-router-dom'
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";

const CardPostSkeleton = ({
  postsLoading,
}) => {
  return (
    <div
    id='card-post-a'
    className='
    flex flex-col gap-2
    rounded-md overflow-hidden max-w-sm bg-white shadow-md
    p-4 w-full
    '
    >
      {/* top */}
      <div
      className='
      flex gap-3 items-center justify-between
      '
      >
        <Skeleton isLoaded={postsLoading}>
          <div
          className='
          flex gap-3 items-center
          '
          >
            <Avatar
            size={'sm'}
            src={''}
            />
            <div>
              <p
              className='
              font-semibold text-slate-400
              '
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, deleniti.
              </p>
              <p
              className='
              text-sm text-slate-400
              '
              >45 minutes ago</p>
            </div>
          </div>
        </Skeleton>
        <SkeletonCircle isLoaded={postsLoading}>
          <IconButton
          isRound={true}
          size='sm'
          icon={<HiOutlineEllipsisHorizontal size={20}/>}
          >
          </IconButton>
        </SkeletonCircle>
      </div>
      
      <SkeletonText
      isLoaded={postsLoading}
      >
        <p
        className='
        text-gray-700 
        '
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ad.
        </p>
      </SkeletonText>

      {/* images */}
      <Skeleton isLoaded={postsLoading}>
        <div
        id='card-post-img-container'
        className='
        relative
        w-full
        mb-2 max-h-48 overflow-hidden rounded-md
        '
        >
          <Link
          //to={`/posts/${post.id}`}
          >
            <img 
            className='
            aspect-square
            object-cover
            w-full rounded-md
            '
            target='_blank'
            src={''} 
            alt="" 
            />
          </Link>
        </div>
      </Skeleton>

      {/* actions */}
      <Skeleton isLoaded={postsLoading}>
        <div
        id='card-post-a-footer'
        className='
        
        '
        >

          {/* likes */}
          <Button
          className='
          flex gap-3 items-center
          text-slate-500
          '
          colorSchema='gray'
          
          variant='ghost'

          >
            <HiMiniHandThumbUp size={20}/>
            <div
            className='
            text-slate-400 text-sm font-normal
            flex gap-2 items-center 
            '
            >
              <span>Likes</span> 
              <span>23</span>
            </div>
          </Button>

          {/* comments */}
          <Button
          className='
          flex gap-3 items-center
          '
          color={'blue.400'}
          variant='ghost'
          >
            <HiChatBubbleLeftRight size={20}/>
            <div
            className='
            text-slate-400 text-sm font-normal
            flex gap-2 items-center 
            '
            >
              <span 
              className='
              '
              >Comments</span>
              {/* <span>-</span> */}
            </div>
          </Button>
        </div>
      </Skeleton>
    </div>
  )
}

export default CardPostSkeleton
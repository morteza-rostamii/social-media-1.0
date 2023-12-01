import React from 'react'
import {useState} from 'react'

// components
import {Button, Avatar, IconButton} from '@chakra-ui/react'
import { HiMiniHandThumbUp } from "react-icons/hi2";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import {Link} from 'react-router-dom'
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { truncateText } from '@/gg/utils/utils.editData';

import usePostsStore from '@/modules/posts/store.post'
import useAuthStore from '@/modules/auth/store.auth'
import {hasUserLiked} from '@/modules/posts/data.posts'

const CardPost_a = ({
  post,
}) => {
  const {authUser} = useAuthStore();
  const {toggleLikePostAct} = usePostsStore();
  const [likeLoading, setLikeLoading] = useState(false);

  async function handLikeToggle() {

    function likeCallback() {
      setLikeLoading(false);
    }

    setLikeLoading(true);
    await toggleLikePostAct({
      postId: post.id, 
      userId: authUser.uid,
      callback: likeCallback,
    })
  }

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
        <div
        className='
        flex gap-3 items-center
        '
        >
          <Avatar
          size={'sm'}
          src={post?.profile?.avatar}
          />
          <div>
            <p
            className='
            font-semibold text-slate-400
            '
            >{post?.profile?.username}</p>
            <p
            className='
            text-sm text-slate-400
            '
            >45 minutes ago</p>
          </div>
        </div>
        <IconButton
        isRound={true}
        size='sm'
        icon={<HiOutlineEllipsisHorizontal size={20}/>}
        >
        </IconButton>
      </div>
      
      <p
      className='
      text-gray-700 
      '
      >
        {truncateText(post?.body, 80)}
      </p>

      {/* images */}
      <div
      id='card-post-img-container'
      className='
      relative
      w-full
      mb-2 max-h-48 overflow-hidden rounded-md
      '
      >
        <Link
        to={`/posts/${post.id}`}
        >
          <img 
          className='
          aspect-square
          object-cover
          w-full rounded-md
          '
          src={post?.image || ''} 
          alt="" 
          />
        </Link>
      </div>

      {/* actions */}
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
        color={`${hasUserLiked(post.likes, authUser.uid) ? 'red' : 'blue.500'}`}
        variant='ghost'

        isLoading={likeLoading}
        onClick={handLikeToggle}
        >
          <HiMiniHandThumbUp size={20}/>
          <div
          className='
          text-slate-400 text-sm font-normal
          flex gap-2 items-center 
          '
          >
            <span>Likes</span> 
            <span>{post.likes.length}</span>
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
    </div>
  )
}

export default CardPost_a
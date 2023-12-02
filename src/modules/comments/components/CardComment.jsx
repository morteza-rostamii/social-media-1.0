import React, { useState } from 'react'

import {Avatar, Button, IconButton} from '@chakra-ui/react'
import InputComment from './InputComment'
import { truncateText } from '@/gg/utils/utils.editData'
import InputReply from './InputReply'
import CardReply from './CardReply'
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiOutlineHandThumbDown } from "react-icons/hi2";

const CardComment = ({
  type='',
  comment,
  comments,
  postId,
}) => {
  // reply input box show or hide
  const [showCommentInput, setShowCommentInput] = useState(false);

  const openCommentInput = () => setShowCommentInput(true);
  const closeCommentInput = () => setShowCommentInput(false);

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
        pl-6 #border-l-2
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
    flex flex-col gap-3 rounded-md w-full justify-start
    ${type !== 'reply' ? 'p-2' : ''}
    `}
    >
      <div
      id='card-comment-top'
      className='
      flex gap-3 mt-2 items-center
      #bg-white p-2 rounded-md
      '
      >
        {/* avatar */}
        <div
        className='
        self-baseline
        '
        >
          <Avatar
          size={`${type === 'reply' ? 'sm' : 'md'}`}
          src={comment?.profile?.avatar}
          />
        </div>
       
        <div
        id='comment-section'
        className='
        flex flex-col w-full
        '
        >

          {/* top section */}
          <div
          className='
          flex flex-col
          '
          >
            {/* date and comment */}
            <div
            >
              <div
              className='
              flex gap-2 items-center
              '
              >
                <span
                className='
                text-gray-600 font-semibold
                '
                >
                  {comment?.profile?.username}
                </span>
                <span
                className='
                text-gray-500 text-sm
                '
                >
                  12 hours ago
                </span>
              </div>
              <p
              className={`
              flex-1 py-2
              text-gray-600 text-lg
              ${type !== 'reply' ? 'font-semibold text-black' : ''}
              `}
              >
                {comment.body}
              </p>
            </div>
          </div> {/* top section */}
          {/* actions */}
          <div
          className='
          flex gap-3 items-center
          '
          >
            
            <Button
            variant='ghost'
            colorScheme='blue'
            size='sm'
            display='flex'
            gap={2}
            >
              <HiOutlineHandThumbUp size='24'/>
              <span>23</span> 
            </Button>
            <Button
            variant='ghost'
            colorScheme='blue'
            size='sm'
            >
              <HiOutlineHandThumbDown size='24'/>
            </Button>
            <Button
            variant='ghost'
            colorScheme='blue'
            size='sm'

            onClick={openCommentInput}
            >
              Reply
            </Button>
          </div> {/* actions */}

          {/* reply box */}
          {
            !!showCommentInput && (
              <InputReply
              postId={postId}
              parentId={comment.id}
              
              closeCommentInput={closeCommentInput}
              />
            )
          }
        </div> {/* comment-section */}
      </div> {/* wrap */}

      {renderReplies()}
    </div>
  )
}

export default CardComment
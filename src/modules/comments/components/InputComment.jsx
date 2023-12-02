import React, { useEffect, useRef, useState } from 'react'
import { Comment } from '@/schemas/schema';
import useAuthStore from '@/modules/auth/store.auth'

// component
import {Button, Input, Avatar, Textarea} from '@chakra-ui/react'
import useCommentsStore from '../store.comments';
import { MdEmojiEmotions } from "react-icons/md";

const InputComment = ({
  postId,
  parentId='',
}) => {  
  const [commentInput, setCommentInput] = useState(new Comment({}));
  const {authUser, authProfile} = useAuthStore();
  const {createCommentAct} = useCommentsStore();
  // state for input action open or close
  const [openActions, setOpenActions] = useState(false);
  const [createCommentLoading, setCreateCommentLoading] = useState(false); 

  const textareaRef = useRef(null);

  const handInputFocus = () => setOpenActions(true);
  const handCancelComment = () => setOpenActions(false);

  const handCreateCommentSubmit = async (e) => {
    
    e.preventDefault();
    setCreateCommentLoading(true);
    if (commentInput.body) {
      await createCommentAct(commentInput, postId, parentId)
        .then(() => {
          
          handCancelComment();
          setCreateCommentLoading(false);
          setCommentInput(new Comment({}));
          textareaRef.current.value = '';
          console.log('made a comment!')
        })
    }
  }

  return (
    <form
    className='
    flex gap-3 items-center
    '
    onSubmit={(e) => handCreateCommentSubmit(e)}
    >
      <div
      className='
      flex h-full self-baseline
      '
      >
        <Avatar 
          src={authProfile?.avatar}
        />
      </div>
      <div
      className='
      flex-1
      '
      >
        <Textarea 
        placeholder='comment' 
        ref={textareaRef}
        variant='flushed'
        rows={2}
        height='auto'
        size={'lg'}
        onChange={(e) => setCommentInput(c => ({...c, body: e.target.value}))}

        onFocus={handInputFocus}
        />
        
        {/* actions */}
        {
          !!openActions && (
            <div
            className='
            flex items-center justify-between py-2
            '
            >
              <div>
                <MdEmojiEmotions size='24'/>
              </div>
              <div
              className='
              flex
              '
              >
                <Button
                variant='ghost'
                colorScheme='blue'
                onClick={handCancelComment}
                >
                  Cancel
                </Button>
                <Button
                variant='ghost'
                colorScheme='blue'
                type='submit'
                isDisabled={!commentInput.body}
                isLoading={createCommentLoading}
                >
                  Comment
                </Button>
              </div>
            </div>
          )
        }
      </div>

      
    </form>
  )
}

export default InputComment
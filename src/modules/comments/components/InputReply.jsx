import React, { useEffect, useRef, useState } from 'react'

import {Input, Button, Avatar, Textarea} from '@chakra-ui/react'
import useCommentsStore from '../store.comments';

import {Comment} from '@/schemas/schema'
import useAuthStore from '@/modules/auth/store.auth'
import { MdEmojiEmotions } from "react-icons/md";

const InputReply = ({
  postId, 
  parentId,
  closeCommentInput,
}) => {
  const textareaRef = useRef(null);
  //const [showForm, setShowForm] = useState(false);
  const [replyInput, setReplyInput] = useState(new Comment({}));
  const {createCommentAct} = useCommentsStore();
  const {authProfile} = useAuthStore();
  const [replyLoading, setReplyLoading] = useState(false);

  async function handReplySubmit(event) {
    event.preventDefault();

    if (replyInput.body) {

      setReplyLoading(true);
      // create reply
      await createCommentAct(
        replyInput,
        postId, 
        parentId,
      )
      .then(() => {
        console.log('clean-------------')
        setReplyLoading(false);
        closeCommentInput();
        setReplyInput(new Comment({}));
        textareaRef.current.value = null;
      })
      
      //setShowForm(false);
    }
  }

  const handInputChange = (e) => setReplyInput(c => ({
    ...c,
    body: e.target.value,
  }));

  const handCancelComment = () => closeCommentInput();

  useEffect(() => {
    console.log(replyInput.body)
  }, [replyInput]);

  return (
    <form
    className='
    flex gap-3 items-center h-full w-full
    '
    onSubmit={(e) => handReplySubmit(e)}
    >
      <div
      className='
      flex h-full self-baseline
      '
      >
        <Avatar 
        size='sm'
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
        size='lg'
        onChange={(e) => handInputChange(e)}

        //onFocus={handInputFocus}
        />
        
        {/* actions */}
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
            isDisabled={!replyInput.body}
            isLoading={replyLoading}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default InputReply
import React, { useEffect, useRef, useState } from 'react'
import { Comment } from '@/schemas/schema';
import useAuthStore from '@/modules/auth/store.auth'

// component
import {Button, Input, Avatar, Textarea} from '@chakra-ui/react'
import useCommentsStore from '../store.comments';

const InputComment = ({
  postId,
  parentId='',
}) => {  
  const [commentInput, setCommentInput] = useState(new Comment({}));
  const {authUser} = useAuthStore();
  const {createCommentAct} = useCommentsStore();

  const textareaRef = useRef(null);

  return (
    <form
    className='
    flex gap-3
    '
    onSubmit={async (e) => {
      e.preventDefault();

      if (commentInput.body) {
        await createCommentAct(commentInput, postId, parentId);
        console.log('made a comment!')
        setCommentInput(new Comment({}));
        textareaRef.current.value = '';
      }
    }}
    >
      <div>
        <Avatar 
          src={authUser?.photoURL}
        />
      </div>
      <div>
      <Textarea 
      placeholder='comment' 
      ref={textareaRef}
      onChange={(e) => setCommentInput(c => ({...c, body: e.target.value}))}
      />
      </div>

      <Button
      type='submit'
      >
        comment
      </Button>
    </form>
  )
}

export default InputComment
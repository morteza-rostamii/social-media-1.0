import React, { useState } from 'react'

import {Input, Button} from '@chakra-ui/react'
import useCommentsStore from '../store.comments';

import {Comment} from '@/schemas/schema'

const InputReply = ({
  postId, 
  parentId,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [replyInput, setReplyInput] = useState(new Comment({}));

  const {createCommentAct} = useCommentsStore();

  async function handReplySubmit(event) {
    event.preventDefault();

    if (replyInput.body) {

      // create reply
      await createCommentAct(
        replyInput,
        postId, 
        parentId,
      );

      setReplyInput(new Comment({}));
      setShowForm(false);
    }
  }

  return (
    <div
    className='
    flex gap-3 #w-full
    '
    >
      <Button
      variant='outline'
      colorScheme='cyan'
      onClick={() => setShowForm(c => !c)}
      >
        reply
      </Button>
      {
        showForm 
        ? (
          <form
          className='
          flex gap-3
          #w-full
          '
          onSubmit={(e) => handReplySubmit(e)}
          >
            <Input
            className='
            flex-1
            '
            value={replyInput.body}
            onChange={(e) => setReplyInput(c => ({...c, body: e.target.value}))}
            />
            <Button
            type='submit'
            variant='outline'
            colorScheme='cyan'
            >
              send
            </Button>
          </form>
        ): ''
      }
    </div>
  )
}

export default InputReply
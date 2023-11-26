import React from 'react'
import useCommentsStore from '../store.comments'

import useRunOnce from '@/gg/hooks/useRunOnce'
import CardComment from './CardComment';

const ListComments = ({
  postId,
}) => {

  const {comments, fetchInitComments} = useCommentsStore();

  useRunOnce(() => {
    (() => fetchInitComments())();
  });

  console.log(comments)
  return (
    <div
    className='
    flex flex-col gap-6
    '
    >
    {
      comments && comments.length
      ? (
        comments.map((comment) => (
          <CardComment 
          key={comment.id}
          comment={comment}
          postId={postId}
          />
        ))
      ): <>fetching comments</>
    }      
    </div>
  )
}

export default ListComments
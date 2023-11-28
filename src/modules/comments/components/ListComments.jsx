import React, { useEffect, useState } from 'react'
import useCommentsStore from '../store.comments'

import useRunOnce from '@/gg/hooks/useRunOnce'
import CardComment from './CardComment';

const ListComments = ({
  postId,
}) => {

  const {comments, fetchInitCommentsAct} = useCommentsStore();
  const [topLevelComments, setTopLevelComments] = useState([]);

  useRunOnce(() => {
    (async () => await fetchInitCommentsAct({
      postId: postId,
    }))();
  });

  useEffect(() => {
    console.log('create-----------toplvel comments')
    //if (topLevelComments.length) return;
    const filtered = comments.filter((comment) => comment.parent === null);
    setTopLevelComments([...filtered]);
  }, [comments]);

  console.log(topLevelComments);
  return (
    <div
    className='
    flex flex-col gap-6
    '
    >
      {
        comments.length && topLevelComments.length
        ? (
          topLevelComments.map((comment) => (
            <CardComment
            key={comment.id}
            comment={comment}
            comments={comments}
            postId={postId}
            />
          ))
        ): 'Loading...'
      }
    </div>
  )
}

export default ListComments
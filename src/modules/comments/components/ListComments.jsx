import React, { useEffect, useState } from 'react'
import useCommentsStore from '../store.comments'

import useRunOnce from '@/gg/hooks/useRunOnce'
import CardComment from './CardComment';
import {Spinner} from '@chakra-ui/react'

const ListComments = ({
  postId,
}) => {

  const {comments, fetchInitCommentsAct} = useCommentsStore();
  const [topLevelComments, setTopLevelComments] = useState([]);
  const [getCommentsLoading, setGetCommentsLoading] = useState(false);

  useRunOnce(() => {
    setGetCommentsLoading(true);
    (async () => await fetchInitCommentsAct({
      postId: postId,
    })
      .then(() => {
        setGetCommentsLoading(false);
      })
    
    )();
  });

  useEffect(() => {
    console.log('create-----------toplvel comments')
    //if (topLevelComments.length) return;
    if (comments?.length) {
      const filtered = comments.filter((comment) => comment.parent === null);
      setTopLevelComments([...filtered]);
    }
  }, [comments]);
  
  // loading for post
  if (getCommentsLoading) return (
    <>
      <div
      className='
      flex flex-col items-center justify-center flex-1 h-full
      '
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
    </>
  )
  
  // after loading
  return (
    <div
    id='list-comments'
    className='
    flex flex-col flex-1 h-full
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
        ): (<>there is no comments</>)
      }
    </div>
  )
}

export default ListComments
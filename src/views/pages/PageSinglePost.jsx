import React, { useEffect, useState } from 'react'

import {useParams} from 'react-router-dom'
import usePostsStore from '@/modules/posts/store.post';
import Comments from '@/modules/comments/components/Comments';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SectionSinglePost from '../../modules/comments/components/SectionSinglePost';

const PageSinglePost = () => {
  const {id} = useParams();
  const {singlePost, fetchSinglePost} = usePostsStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchSinglePost(id);
      setIsLoading(false);
    })();
  }, []);

  return (
    <main
    id='page-single-post'
    className='
    container mx-auto bg-slate-50 #h-full
    flex #justify-center flex-1
    '
    >
      <div
      id='page-single-post-wrap'
      className='
      flex flex-col gap-12 p-4
      w-10/12 mx-auto h-full
      '
      >
        <SectionSinglePost
        singlePost={singlePost}
        isLoading={isLoading}
        />
        
        {/* comments section */}
        <Comments postId={id}/>
      </div>
    </main>
  )
}

export default PageSinglePost
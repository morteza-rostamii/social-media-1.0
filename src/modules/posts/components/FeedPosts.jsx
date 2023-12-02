import React, { useEffect, useState } from 'react'
import CardPost_a from './CardPost_a'
import usePostsStore from '../store.post'
import useRunOnce from '@/gg/hooks/useRunOnce'

import InfiniteScroll from 'react-infinite-scroll-component'
import {Button} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import CardPostSkeleton from './CardPostSkeleton'

const FeedPosts = () => {
  const {posts, lastDoc, fetchInitPosts, fetchMorePosts} = usePostsStore();
  // is posts loading
  const [postsLoading, setPostsLoading] = useState(false);

  useRunOnce(() => {
    setPostsLoading(false);
    (async () => {
      await fetchInitPosts();
      console.log('posts has loaded!!');
      setPostsLoading(true);
    })();
  });

  if (!postsLoading) return (
    <>
    {
      Array.from(new Array(3)).map(() => <CardPostSkeleton postsLoading={postsLoading}/>)
    }
    </>
  )

  return (
    <div
    id='home-posts-infinit'
    className='
    flex flex-col gap-4 items-center
    w-full overflow-hidden
    '
    >
      
      <InfiniteScroll
      className='
      flex flex-col w-full gap-6 #bg-red-50 overflow-hidden
      '

      //data={posts}
      dataLength={posts.length}
      loader={<Spinner size='lg' />}
      next={fetchMorePosts}
      hasMore={lastDoc}
      endMessage={<div 
      className='
      text-center
      '
      >no more posts</div>}
      >
        {
          posts && posts.length
          ? (
            posts.map((post) => {
              return <CardPost_a 
              postsLoading={postsLoading}
              key={post.id} 
              post={post}/>
            })
          ):('')
        }
      </InfiniteScroll>
    </div>
  )
}

export default FeedPosts
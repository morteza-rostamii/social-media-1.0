import React, { useEffect } from 'react'
import CardPost_a from './CardPost_a'
import usePostsStore from '../store.post'
import useRunOnce from '@/gg/hooks/useRunOnce'

import InfiniteScroll from 'react-infinite-scroll-component'
import {Button} from '@chakra-ui/react'

const FeedPosts = () => {
  const {posts, lastDoc, fetchInitPosts, fetchMorePosts} = usePostsStore();

  useRunOnce(() => {
    (async () => fetchInitPosts())();
  });

  return (
    <div
    id='home-posts-infinit'
    className='
    flex flex-col gap-4 items-center
    w-full 
    '
    >
      
      <InfiniteScroll
      className='
      flex flex-col w-full gap-6 #bg-red-50
      '

      //data={posts}
      dataLength={posts.length}
      loader={<div>Loading...</div>}
      next={fetchMorePosts}
      hasMore={lastDoc}
      endMessage={<div>no more date!!</div>}
      >
        {
          posts && posts.length
          ? (
            posts.map((post) => {
              return <CardPost_a key={post.id} post={post}/>
            })
          ):('')
        }
      </InfiniteScroll>

      {/* <Button
      className='
      '
      isDisabled={!lastDoc}
      onClick={() => fetchMorePosts()}
      >
        load more
      </Button> */}
    </div>
  )
}

export default FeedPosts
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
    >
      
      <InfiniteScroll
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
              console.log(posts);
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
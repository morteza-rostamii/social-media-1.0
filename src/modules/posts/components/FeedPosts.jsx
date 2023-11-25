import React, { useEffect } from 'react'
import CardPost_a from './CardPost_a'
import usePostsStore from '../store.post'
import useRunOnce from '@/gg/hooks/useRunOnce'

const FeedPosts = () => {
  const {posts, fetchPosts} = usePostsStore();

  useRunOnce(() => {
    (async () => fetchPosts())();
  });

  return (
    <div
    id='home-posts-infinit'
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
    </div>
  )
}

export default FeedPosts
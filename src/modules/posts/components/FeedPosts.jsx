import React, { useEffect } from 'react'
import CardPost_a from './CardPost_a'
import usePostsStore from '../store.post'

const FeedPosts = () => {
  const {posts, fetchPosts} = usePostsStore();

  useEffect(() => {
    (async () => fetchPosts())();
  }, []);

  return (
    <div
    id='home-posts-infinit'
    >
      {
        posts && posts.length
        ? (
          posts.map((post) => <CardPost_a key={post.id} post={post}/>)
        ):('')
      }
    </div>
  )
}

export default FeedPosts
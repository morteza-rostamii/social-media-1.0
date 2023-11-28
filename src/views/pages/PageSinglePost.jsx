import React, { useEffect } from 'react'

import {useParams} from 'react-router-dom'
import usePostsStore from '@/modules/posts/store.post';
import Comments from '@/modules/comments/components/Comments';

const PageSinglePost = () => {
  const {id} = useParams();
  const {singlePost, fetchSinglePost} = usePostsStore();

  useEffect(() => {
    (() => fetchSinglePost(id))();
  }, []);

  return (
    <main
    id='page-single-post'
    className='
    '
    >
      <div
      id='page-single-post-wrap'
      className='
      flex flex-col gap-12 p-4
      max-w-3xl mx-auto bg-slate-50
      '
      >
        {/* single post */}
        <div>
          {
            singlePost
            ? (
              <>
                <div
                className='
                w-full
                '
                >
                  {/* <img 
                  className='
                  w-full
                  object-cover
                  '
                  src={singlePost?.img} 
                  alt={'single post'} /> */}
                </div>
                <p>
                  {singlePost?.body}
                </p>
              </>
            ): 'loading...'
          }
        </div>
        
        {/* comments section */}
        <Comments postId={id}/>
      </div>
    </main>
  )
}

export default PageSinglePost
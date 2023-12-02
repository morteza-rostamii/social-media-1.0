import React, { useEffect, useState } from 'react'

import {useParams} from 'react-router-dom'
import usePostsStore from '@/modules/posts/store.post';
import Comments from '@/modules/comments/components/Comments';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const SectionSinglePost = ({
  singlePost,
  isLoading,
}) => {

  //if (isLoading) return <>Loadding single post!!</>
  if (isLoading) return (
    <main
    id='page-single-post'
    className='
    container mx-auto bg-slate-50
    flex justify-center flex-1
    '
    >
      <div
      id='page-single-post-wrap'
      className='
      flex flex-col gap-4 p-4 flex-1
      max-w-3xl h-full w-full
      '
      >
        <Skeleton height='200px' />
        <Skeleton height='50px' />
      </div>
        
    </main>
  )

  return (
    <>
      {/* single post */}
      {
        singlePost
        ? (
          <>
            <div
            className='
            w-full
            '
            >
              <img 
              className='
              w-full max-h-96
              object-cover rounded-md
              '
              src={singlePost?.image} 
              alt={'single post'} 
              style={{
                objectPosition: '50% 0%'
              }}
              />
            </div>
            <p
            className='
            text-xl text-gray-600
            '
            >
              {singlePost?.body}
            </p>
          </>
        ): <></>
      }
    </>
  )
}

export default SectionSinglePost
import React, { useEffect, useState } from 'react'
import useRunOnce from '@/hooks/useRunOnce'
import useBlogStore from '@/store/store.blog'
import {firestore} from '@/firebase/firedb'

// compos
import {Button} from '@mantine/core'
import BlogEdit from '@/views/components/BlogEdit'
import BlogCreate from '@/views/components/BlogCreate'

const PageBlog = () => {
  const {blogs, fetchBlogs, deleteBlog, getPublishedBlogs, testStuff} = useBlogStore();

  useRunOnce(() => {
    fetchBlogs();
  });

  useEffect(() => {
    async function getPublished() {
      const publishedBlogs = await getPublishedBlogs();
      console.log(publishedBlogs);
    }
    getPublished();

    testStuff();
  }, [])

  return (
    <div
    className='
    flex flex-col gap-3 p-8
    '
    >
      <div
      className='
      flex gap-3
      '
      >
        <div>
          <BlogCreate/>
        </div>
      </div>

      <div>
        <h1>Blogs:</h1>
        <div
        className='
        flex flex-col gap-8
        '
        >
          {
            blogs 
            ? blogs.map((blog) => (
              <div 
              className='
              flex flex-col gap-3
              '
              key={blog.id}>
                <h2
                className='
                font-bold text-xl
                '
                >
                {blog.title}
                </h2>
                
                <p>
                  {blog.body}
                </p>
                
                <div
                className='
                flex gap-3
                '
                >
                  <div
                  className='
                  flex-1
                  '
                  >
                    <BlogEdit 
                    currentBlog={blog}
                    key={blog.id}/>
                  </div>
                  <Button
                  onClick={() => deleteBlog(blog.id)}
                  >
                  delete
                  </Button>
                </div>
              </div>
            ))
            : ''
          }
        </div>
      </div>
    </div>
  )
}

export default PageBlog
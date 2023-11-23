import React, { useState } from 'react'
import useBlogStore from '@/store/store.blog';

// component
import {TextInput} from '@mantine/core'
import { Textarea, Button } from '@mantine/core';

const BlogCreate = ({
}) => {
  const [blog, setBlog] = useState({
    title: '',
    body: '',
  });

  const {createBlog} = useBlogStore();
  
  function handCreateBlog(event) {
    event.preventDefault();
    if (blog.title && blog.body) createBlog(blog);
  }

  return (
    <div
    
    >
      <form 
      className='
      flex flex-col gap-3
      '
      onSubmit={(e) => handCreateBlog(e)}
      >
        <h1>create blog</h1>
        <TextInput 
        label="Input label" 
        description="Input description" 
        
        value={blog.title}
        onChange={(e) => setBlog(c => ({...c, title: e.target.value}))}
        />
        <Textarea
        placeholder='article body'

        value={blog.body}
        onChange={(e) => setBlog(c => ({...c, body: e.target.value}))}
        />
        <Button
        type='submit'
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogCreate
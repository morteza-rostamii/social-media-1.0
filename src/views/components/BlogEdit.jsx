import React, { useState } from 'react'

// component
import {TextInput} from '@mantine/core'
import { Textarea, Button } from '@mantine/core';
import useBlogStore from '@/store/store.blog';

const BlogEdit = ({
  currentBlog,
}) => {
  const [blog, setBlog] = useState({
    title: currentBlog.title,
    body: currentBlog.body,
  });

  const {editBlog} = useBlogStore();
  
  function handEditBlog(event) {
    event.preventDefault();

    console.log(blog);
    editBlog(currentBlog.id, blog);
  }

  return (
    <div
    
    >
      <form 
      className='
      flex flex-col gap-3
      '
      onSubmit={(e) => handEditBlog(e)}
      >
        <h1>edit blog</h1>
        <TextInput 
        //label="Input label" 
        //description="Input description" 
        
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
          edit
        </Button>
      </form>
    </div>
  )
}

export default BlogEdit
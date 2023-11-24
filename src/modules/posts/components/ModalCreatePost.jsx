import React, { useEffect, useState } from 'react'

import usePostsStore from '@/modules/posts/store.post';
import useAuthStore from '@/modules/auth/store.auth';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { storage } from '@/firebase/firedb';
import {v4} from 'uuid'

// components
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { Textarea } from '@chakra-ui/react'

const ModalCreatePostWrap = (Component) => {

  return (props) => {
    const {authUser, } = useAuthStore();
    const {createPost, newPost, setNewPost, resetNewPost} = usePostsStore();

    const tempProps = JSON.parse(JSON.stringify(props));
    tempProps.authUser = authUser;
    tempProps.createPost = createPost;
    tempProps.newPost = newPost;
    tempProps.setNewPost = setNewPost;
    tempProps.resetNewPost = resetNewPost;

    // spread operator in passing props
    return <Component {...tempProps}/>
  }
}

class ModalCreatePost extends React.Component {

  constructor(props) {
    super(props);

    // ref to file input 
    this.fileInputRef = React.createRef();

    this.state = {
      isOpen: false,
      selectedImg: null,
    }
  }

  // don't update state here (infinite loop)
  // this does not on the first mount (2 times mount)
  componentDidUpdate(prevProps, prevState) {
    //if (prevState.count !== this.state.count) {
    //console.log(prevProps, prevState);
  }

  componentDidMount() {
    //console.log('mounted!!');
    //console.log(this.props);
    console.log('--', this.props.newPost)
  }

  //=====================================

  handOpen = () => this.setState(c => ({
    ...c, 
    isOpen: true,
  })); 

  handClose = () => this.setState(c => ({
    ...c,
    isOpen: false,
  }));

  async handCreatePost(event) {
    event.preventDefault();
    
    console.log(this.props.newPost);    
    await this.props.createPost(this.props.newPost);

    console.log('after post create in component!!');

    this.handClose();
    this.props.resetNewPost();
  }

  // select file and upload
  handFileChange(event) {
    const file = event.target.files[0];
    this.setState(
      {
        // this only sets selectedImg and not other props
        selectedImg: file,
      },
      async () => {
        console.log(this.state.selectedImg);
        
        // file upload
        try { 
          const filesDirRef = ref(storage, `images/${file.name}${v4()}`);
          const res = await uploadBytes(
            filesDirRef,
            file,
          );

          console.log('success file upload!!', res);
          // clear file input
          this.fileInputRef.current.value = null;

          console.log(res.metadata.fullPath);

          const imgUrl = res.metadata.fullPath;
          const imgRef = ref(storage, imgUrl);
          const downloadUrl = await getDownloadURL(imgRef);

          // inject the image
          /* const img = document.createElement('img');
          img.src = downloadUrl;
          const imgContainer = document.querySelector('#img-container');
          imgContainer.appendChild(img); */

          this.props.setNewPost({
            img: downloadUrl,
          });

        } catch(error) {
          console.log(`file upload failed!`, error.message);
        }

    });
  }

  handTextChange = (e) => {
    //console.log(e.target.value)

    this.props.setNewPost({
      body: e.target.value,
    });
    //this.props.resetNewPost();
  }

  render() {

    return (
      <div>
        <Button
        colorScheme='cyan'
        variant='outline'
        borderRadius='100%'
        width='60px'
        height='60px'

        onClick={this.handOpen}
        >
          <FaPlus size='60'/>
        </Button>

        <Modal isOpen={this.state.isOpen} onClose={this.handClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>create a post</ModalHeader>
            <ModalBody>
              <form 
              onSubmit={(e) => this.handCreatePost(e)}
              >
                <FormControl isInvalid={false}>
                  <Textarea 
                  placeholder='what do you think...'
                  type='text' 
                  value={this.props.newPost.body} 
                  onChange={(e) => this.handTextChange(e)} 
                  />
                  {!false ? (
                    ''
                  ) : (
                    <FormErrorMessage>enter what you think!!</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  
                  <label 
                  className="
                  block mb-2 text-sm font-medium 
                  text-gray-900 
                  dark:text-white" 
                  htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input 
                  id="file_input"
                  className="
                  block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  
                  type="file"
                  
                  ref={this.fileInputRef}
                  onChange={(e) => this.handFileChange(e)}
                  />

                </FormControl>

                {/* show img */}
                <div 
                id='img-container' 
                className='
                max-h-60 overflow-hidden
                '>
                  {
                    this.props.newPost.img 
                    ? (
                      <img
                      src={this.props.newPost.img}
                      alt='uploaded image'
                      />
                    ): ('')
                  }
                </div>

                <Button
                type='submit'
                >
                  send
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={this.handClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
  }
}

export default ModalCreatePostWrap(ModalCreatePost)
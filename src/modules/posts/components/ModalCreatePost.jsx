import React, { useEffect, useState } from 'react'

import usePostsStore from '@/modules/posts/store.post';
import useAuthStore from '@/modules/auth/store.auth';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { storage } from '@/firebase/firedb';
import {v4} from 'uuid'
import toast, { Toaster } from 'react-hot-toast';

// components
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { Textarea } from '@chakra-ui/react'
import { HiMiniPencilSquare } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import FilePickerPost from './FilePickerPost';
import { uploadOneImage } from '@/modules/files/data.files';

const ModalCreatePostWrap = (Component) => {

  return (props) => {
    const {authUser, authProfile} = useAuthStore();
    const {createPost, newPost, setNewPost, resetNewPost} = usePostsStore();

    const tempProps = JSON.parse(JSON.stringify(props));
    tempProps.authUser = authUser;
    tempProps.createPost = createPost;
    tempProps.newPost = newPost;
    tempProps.setNewPost = setNewPost;
    tempProps.resetNewPost = resetNewPost;
    tempProps.profile = authProfile;

    // spread operator in passing props
    return <Component {...tempProps}/>
  }
}

const toastCreatePostSuccess = () => toast.success('you created a post');
const toastCreatePostError = () => toast.error('you created a post');

class ModalCreatePost extends React.Component {

  constructor(props) {
    super(props);

    // ref to file input 
    this.fileInputRef = React.createRef();

    this.state = {
      isOpen: false,
      selectedFiles: [],
      loadingCreatePost: false,
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
    //console.log('--', this.props.newPost)
  }

  //=====================================

  handOpen = () => {
    this.setState(c => ({
      ...c, 
      isOpen: true,
    })); 
  }

  handClose = () => {
    this.setState(c => ({
      ...c,
      isOpen: false,
    }));
  }

  setSelectedFiles = (files) => {
    this.setState({
      selectedFiles: files,
    });
  }

  async handCreatePost(event) {
    event.preventDefault();
    
    console.log(this.state.selectedFiles, this.props.newPost)
    
    // if not input
    if (!this.props.newPost.body) {
      toastCreatePostError();
      return;
    }

    this.setState({
      loadingCreatePost: true,
    });

    // upload file
    let uploadedImgUrl = '';
    if (this.state.selectedFiles && this.state.selectedFiles?.length) {
      uploadedImgUrl = await uploadOneImage({
        file: this.state.selectedFiles,
        path: 'images',
      });
    }

    this.props.setNewPost(c => ({
      ...c,
      image: uploadedImgUrl,
    }));
    // create post
    await this.props.createPost(this.props.newPost);
    console.log('after post create in component!!');

    // clean up
    this.handClose();
    this.props.resetNewPost();

    // stop load
    this.setState({
      loadingCreatePost: false,
    });

    // clean file input
    this.fileInputRef.current.value = null;
    this.setState(c => ({
      ...c,
      selectedFiles: []
    }))

    toastCreatePostSuccess();
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
      <>
        {/* open modal button */}
        <div
        className='
        flex items-center justify-between
        h-16 w-full shadow-md max-w-lg bg-white rounded-md p-4
        cursor-pointer 
        '
        onClick={() => this.handOpen()}
        >
          <div></div>
          <p
          className='
          text-gray-600
          '
          >
            what's on your mind, {this.props?.profile?.username}</p>
          <HiMiniPencilSquare 
          size={24}
          color={'gray'}
          />
        </div>

        {/* modal */}
        <Modal isOpen={this.state.isOpen} onClose={this.handClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
            //borderBottom='1px solid gray'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            >
              <p
              className='
              text-gray-600
              '
              >
                create post
              </p>
              <IconButton
              colorScheme="blue" 
              color={'blue.500'}
              variant='outline'
              isRound={true}
              onClick={this.handClose}>
                <HiXMark size={20}/>
              </IconButton>
            </ModalHeader>
            <ModalBody>
              <form 
              className='
              flex flex-col gap-3
              '
              onSubmit={(e) => this.handCreatePost(e)}
              >
                <FormControl isInvalid={false}>
                  <Textarea 
                  placeholder='what do you think...'
                  size='lg'
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

                <FilePickerPost
                ref={this.fileInputRef}
                selectedFiles={this.state.selectedFiles}
                setSelectedFiles={this.setSelectedFiles}
                />

                <Button
                color={'blue.500'}
                variant='outline'
                type='submit'
                isLoading={this.state.loadingCreatePost}
                >
                  send
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
}

export default ModalCreatePostWrap(ModalCreatePost)
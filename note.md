<!-- 

# firebase and react pagination:
==

# creating User_modal upon regisnter:
==

# 

# show posts that are users subs:
== 
  # else: show random posts












# real-time firebase:
==



# firebase relations:
==

# react nested comments:
==

# each user can like once: 
# post.likes[user-1, user-2]

if (user-1 exists in post.likes) 
  # like button red
  # click again
    # remove user-1 from post.likes
    # change color 

----------------------------------

const comments: [
  {
    id: 0,
    name: comment-0,
  },
  {
    id: 1,
    name: comment-1,
    parent: 0,
  },
  {
    id: 2,
    name: comment-2
    parent: 1,
  },
  {
    id: 3,
    name: comment-3
  },
]

--
comment-0
  comment-1
    comment-2
comment-3

# loop throuhg comments

# create object: 
{
  parentId: {
    parentId: Comment,
    children: 
  }
}

----------------------------------

# how to loop a nested structure:
==

{
  a: {
    id: 0,
    children: [
      {
        id: 1,
        children: [
          {
            id: 2,
          }
        ]
      }
    ]
  },

  b: {
    id: 3,
    children: [
      {
        id: 4,
      }
    ]
  }
}

----------------------------------

# @reply to: comment x
==

# each comment has: parent.id
const element = document.querySelector('#parent.id');
element.scrollIntoView();













----------------------------------

# nested comments:
==

# data structures comming from db:

# data sctructure to render:

# ui problems:
  # nesting and indentation
  # stop neting level

-----

# 

----------------------------------

----------------------------------

----------------------------------

----------------------------------

----------------------------------

[
  {
    id: 0,
    level: 0,
    children: [
      {
        id: 1,
        level: 1,
        children: [
          {
            id: 4,
            level: 2,
            children: []
          }
        ]
      },
      {
        id: 3,
        level: 1,
        children: []
      },
    ]
  },

  {
    id: 2,
    level: 0,
    children: []
  }
]















 <!-- 










<!-- 

# notifications:
==




# When you call an async function that does not have an await inside it, the function will still return a promise.
 -->












































 
 /* 
const ModalCreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {authUser, } = useAuthStore();
  const [newPost, setNewPost] = useState(new Post({
    body: '',
    user: authUser.uid,
    img: '',
  }));
  const [selectedImg, setSelectedImg] = useState(null);

  const {createPost} = usePostsStore();

  const handOpen = () => setIsOpen(true); 
  const handClose = () => setIsOpen(false);

  async function handCreatePost(event) {
    event.preventDefault();
    
    console.log(newPost, selectedImg);

    
    
    

    //await createPost(newPost);

    console.log('after post create in component!!');
  }

  function handFileChange(event) {
    const file = event.target.files[0];
    setSelectedImg(
      {
        selectedImg: file,
      },
      () => {
        console.log(selectedImg)
    });
  }

  useEffect(() => {
    console.log(newPost.img);
  }, [newPost.img])

  return (
    <div>
      <Button
      colorScheme='cyan'
      variant='outline'
      borderRadius='100%'
      width='60px'
      height='60px'

      onClick={handOpen}
      >
        <FaPlus size='60'/>
      </Button>

      <Modal isOpen={isOpen} onClose={handClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create a post</ModalHeader>
          <ModalBody>
            <form 
            onSubmit={(e) => handCreatePost(e)}
            >
              <FormControl isInvalid={false}>
                <Textarea 
                placeholder='what do you think...'
                type='text' 
                value={newPost.body} 
                onChange={(e) => setNewPost(c => ({...c, body: e.target.value}))} 
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

                onChange={(e) => handFileChange(e)}
                />

              </FormControl>

              <Button
              type='submit'
              >
                send
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
} */
 
 

<!-- 
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
          

          this.props.setNewPost({
            img: downloadUrl,
          });

        } catch(error) {
          console.log(`file upload failed!`, error.message);
        }

    });
  }















  /* 
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

*/
 -->
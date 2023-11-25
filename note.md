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






















 <!-- 
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
 
 
  -->
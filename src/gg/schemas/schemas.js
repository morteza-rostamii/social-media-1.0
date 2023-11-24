import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot} from 'firebase/firestore'

const schemas = {

  async usersModel(
    collectionRef,
    {
    username= '',
    age= 0,
    img= '',
    status= false, // online/offline
    lastOnline= new Date().now(),
    createdAt= new Date().now(),
    updatedAt= new Date().now(),

    posts= [], // [Post:id]
    subscriptions= []// [User:id],
    }
  ) {

    addDoc(collectionRef, {
      username,
      age,
      img,
      status,
      lastOnline,
      createdAt,
      updatedAt,

      posts,
      subscriptions,
    })
      .then(async (ref) => {
        
        console.log('success createing blog!! ', ref.id);
      })
      .catch((error) => {
        console.log(error.message);
      })
  },

  async postsModel(
    collectionRef,
    {
      body= '',
      image= '',
      numOfLikes= 0,
      numOfComments= 0,
      createdAt= new Date().now(),
      updatedAt= new Date().now(),

      comments= [], //[Comment:id]
      user= '', // User:id
    }
  ) {

  },

  async commentsModel(
    collectionRef,
    {
      body= '',
      createdAt= new Date().now(),
      updatedAt= new Date().now(),

      user= '', // User:id
      replies= [] // [Comments:id] 
    }
  ) {

  },

  async notificationsModel(
    collectionRef,
    {
      body= '',
      createdAt= new Date().now(),
      updatedAt= new Date().now(),

      sender= '', // User:id
      reciever= '', // receiver
      comment= '', // Comment:id
    }
  ) {

  }
}

export default schemas
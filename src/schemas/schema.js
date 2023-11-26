import {Timestamp, serverTimestamp} from 'firebase/firestore'

export class Post {

  constructor({
    body, 
    image,
    numOfLikes,
    numOfComments,
    //createdAt, 
    //updatedAt,
    comments,
    user,
  }) {
    this.body= body || '';
    this.image= image || '';
    this.numOfLikes= numOfLikes || 0;
    this.numOfComments= numOfComments || 0;
    this.createdAt= serverTimestamp();
    this.updatedAt= serverTimestamp();

    this.comments= comments || []; //[Comment=id]
    this.user= user || ''; // User:id
  }
}
//Timestamp.fromDate(new Date())

export class Profile {

  constructor({
    //id,
    username,
    age,
    avatar, 
    status,
    lastOnline,

    posts,
    subscriptions,
    user,
  }) {
    //this.id = id,
    this.username = username || '';
    this.age = age || 0;
    this.avatar = avatar || '',
    this.status = status || false, // online/offline
    this.lastOnline = lastOnline || serverTimestamp();
    this.createdAt = serverTimestamp();
    this.updatedAt = serverTimestamp();

    this.posts = posts || []; // [Post:id]
    this.subscriptions = subscriptions || []; // [User:id]
    this.user = user || ''; // User:id 
  }
}

// Comment

class Comment {

  constructor() {
    
  }
}
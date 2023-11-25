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
import {Timestamp} from 'firebase/firestore'

export class Post {

  constructor({
    body, 
    image,
    numOfLikes,
    numOfComments,
    createdAt, 
    updatedAt,
    comments,
    user,
  }) {
    this.body= body || '';
    this.image= image || '';
    this.numOfLikes= numOfLikes || 0;
    this.numOfComments= numOfComments || 0;
    this.createdAt= createdAt || Timestamp.fromDate(new Date());
    this.updatedAt= updatedAt || Timestamp.fromDate(new Date());

    this.comments= comments || []; //[Comment=id]
    this.user= user || ''; // User:id
  }
}
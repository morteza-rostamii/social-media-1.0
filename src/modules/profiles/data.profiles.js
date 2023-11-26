import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import {firestore} from '@/firebase/firedb'

const profilesCollectionRef = collection(firestore, 'profiles');

// profiles/:userId
export async function fetchProfileByUserId(userId) {
  // get doc ref
  const profileRef = query(
    profilesCollectionRef, 
    where('user', '==', userId),
    );
  
  const profileSnapshot = await getDocs(profileRef);

  const docs = profileSnapshot.docs;

  const profiles = docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  });

  console.log(profiles);
  return profiles[0];
}
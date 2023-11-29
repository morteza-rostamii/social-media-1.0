import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { storage } from '@/firebase/firedb';
import {v4} from 'uuid'

export async function uploadOneImage({
  path='',
  file= null,
  //callBack= () => {},
}) {
  const filesDirRef = ref(storage, `${path}/${file.name}${v4()}`);
  const result = await uploadBytes(
    filesDirRef,
    file)

  console.log('success file upload!!', result);
  // clear file input
  //this.fileInputRef.current.value = null;
  //callBack();

  const imgUrl = result.metadata.fullPath;
  const imgRef = ref(storage, imgUrl);

  const downloadUrl = await getDownloadURL(imgRef);
  return downloadUrl;
}
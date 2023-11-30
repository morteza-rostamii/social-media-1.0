import React, { useEffect, useRef, useState } from 'react'
import { HiCloudUpload } from "react-icons/hi";

import {IconButton} from '@chakra-ui/react'
import { HiX } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

const FilePickerPost = ({
  selectedFiles,
  setSelectedFiles,
}, ref) => {
  //const ref = useRef(null);
  // files
  //const [selectedFiles, setSelectedFiles] = useState([]);

  function handClick() {
    // trigger file sellection
    ref.current?.click();
  }

  // convert and set files
  function handChange(event) {
    const files = Array.from(event.currentTarget.files ?? []);
    //console.log(URL.createObjectURL(files[0]))
    setSelectedFiles(files);
  }

  function handRemoveImg() {
    setSelectedFiles([]);
    ref.current.value = null;
  }

  /* useEffect(() => {
    setUser(c => ({
      ...c, 
      avatar: selectedFiles[0],
    }));
  }, [selectedFiles]); */

  return (
    <div
    className='
    flex flex-col gap-3
    '
    >
      <div 
      className="
      p-4 flex flex-col items-center 
      gap-2 bg-blue-50 
      text-blue-500 rounded-lg 
      hover:bg-blue-100 cursor-pointer"
      
      onClick={handClick}
      >
        <HiCloudUpload 
        className="#w-6 #h-6" 
        size={32}
        />
        <span>Choose an image</span>
        <input 
        className="hidden" 
        type="file" 
        ref={ref} 

        onChange={(e) => handChange(e)}
        />
      </div>

      {/* display files */}
      <div
      className='
      
      '
      >
        {
          !!selectedFiles.length && (
            <div
            className='
            flex
            '
            >
              {
                selectedFiles.map((file, i) => {
                  
                  console.log(file)
                  return (
                    <div
                    className='
                    relative
                    '
                    >
                      <img 
                      className='
                      rounded-md overflow-hidden
                      w-24 object-cover aspect-square
                      '
                      key={i}
                      src={URL.createObjectURL(file)}
                      />

                      <IconButton 
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                      }}
                      isRound={true}
                      variant='solid'
                      size='xs'
                      color='black'
                      onClick={handRemoveImg}>
                        <HiX size={18}/>
                      </IconButton>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default React.forwardRef(FilePickerPost)
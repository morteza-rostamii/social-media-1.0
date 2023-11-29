import React, { useEffect, useRef, useState } from 'react'
import { HiCloudUpload } from "react-icons/hi";

import {IconButton} from '@chakra-ui/react'
import { HiX } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

const FilePicker = ({
  user,
  setUser,
}) => {
  const ref = useRef(null);
  // files
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  useEffect(() => {
    setUser(c => ({
      ...c, 
      avatar: selectedFiles[0],
    }));
  }, [selectedFiles]);

  return (
    <div
    className='
    flex flex-col gap-3
    '
    >

      <div
      className='
      flex items-center justify-center
      bg-blue-200 w-full h-20 rounded-md
      text-blue-50
      '
      >
        <HiOutlineUserCircle
        size={56}
        />
      </div>
      <div 
      className="
      p-4 flex flex-col items-center 
      gap-2 bg-violet-50 
      text-violet-500 rounded-lg 
      hover:bg-violet-100 cursor-pointer"
      
      onClick={handClick}
      >
        <HiCloudUpload 
        className="#w-6 #h-6" 
        size={32}
        />
        <span>Choose an avatar image</span>
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

export default FilePicker
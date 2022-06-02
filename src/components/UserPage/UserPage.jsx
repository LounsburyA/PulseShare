import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

// imports for file upload
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

// import for playing videos on dom
import ReactPlayer from 'react-player'

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const image = useSelector(store => store.image);

  let imageUrl = '';
  
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files, allFiles) => {
    for(let i = 0; i < files.length; i++) {
      console.log(files[i])
      const fileToUpload = files[i];
      console.log(fileToUpload['file']);

      // get secure url from our server
      const { url } = await fetch("/s3Url").then(res => res.json())
      console.log(url)

      // post the image directly to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: fileToUpload['file']
      })

      imageUrl = url.split('?')[0]
      console.log(imageUrl)

      // dispatch({
      //   type: 'SET_IMAGE',
      //   payload: imageUrl
      // })
    }

    // Empties Dropzone 
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }


  

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={3}
        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Click Here or Drag 1 Picture/Video')}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          dropzone: { width: 400, minHeight: 300, maxHeight: 350 },
          dropzoneActive: { borderColor: "green" }
        }}
        accept="image/*,audio/*,video/*"
      />
      <img src={image}/>
      <ReactPlayer 
        url={image}
        width='400px'
        height='600px'
        controls = {true}/>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

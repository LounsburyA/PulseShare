import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import './AddPostPage.css'

// imports for MUI v5
import {
    Box,
    Container,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Modal,
    Typography,
    TextField,
    FormControl
} from '@mui/material';

// import for sweetalert2
import Swal from 'sweetalert2'

// imports for file upload
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

function AddPostPage() {
    useEffect(() => {
        //List for outcomes dropdown
        dispatch({
            type: 'GET_OUTCOMES_LIST'
        });
        dispatch({
            type: 'CLEAR_VIDEO'
        })
        dispatch({
            type: 'CLEAR_IMAGE'
        })
        dispatch({
            type: 'CLEAR_POST'
        })
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const image = useSelector( store => store.imageReducer);
    const video = useSelector( store => store.videoReducer);
    const post = useSelector(store => store.post)
    const outcomesList = useSelector( store => store.outcomesListReducer);

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [outcomeTag, setOutcomeTag] = useState('');
    let imageUrl = null;
    let videoUrl = null;

    const [openImageModal, setOpenImageModal] = React.useState(false);
    const handleOpenImageModal = () => setOpenImageModal(true);
    const handleCloseImageModal = () => setOpenImageModal(false);

    const [openVideoModal, setOpenVideoModal] = React.useState(false);
    const handleOpenVideoModal = () => setOpenVideoModal(true);
    const handleCloseVideoModal = () => setOpenVideoModal(false);
    
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
        
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmitImage = (files, allFiles) => {
        console.log(files[0])
        const imageToUpload = files[0];
        console.log(imageToUpload['file']);

        dispatch({
            type: 'SET_IMAGE',
            payload: imageToUpload
        })

        // Empties Dropzone 
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

     // receives array of files that are done uploading when submit button is clicked
    const handleSubmitVideo = (files, allFiles) => {
        console.log(files[0])
        const videoToUpload = files[0];
        console.log(videoToUpload['file']);

        dispatch({
            type: 'SET_VIDEO',
            payload: videoToUpload
        })

        // Empties Dropzone 
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    // function will clear media reducer and allow user to input new media
    const handleChangeImage = () => {
        dispatch({
            type: 'CLEAR_IMAGE'
        })
    }

    // function will clear media reducer and allow user to input new media
    const handleChangeVideo = () => {
        dispatch({
            type: 'CLEAR_VIDEO'
        })
    }

    const handleClick = async () => {
        // if title or body text fields are empty, won't submit
        if (postTitle === '' || postBody === '' || outcomeTag === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all required fields!',
                footer: 'Title, Body, and Outcome Tag are all required to make a post.'
            })
        } else {
            if(image.file) {
                // get secure url from our server
                const { url } = await fetch("/s3Url/image").then(res => res.json())
                console.log(url)

                // post the image directly to the s3 bucket
                await fetch(url, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "image/jpeg"
                    },
                    body: image['file']
                })

                // creates url path for image
                imageUrl = url.split('?')[0]
                console.log(imageUrl)
            } 

            if(video.file) {
                const { url } = await fetch("/s3Url/video").then(res => res.json())
                console.log(url)

                await fetch(url, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "video/mp4"
                    },
                    body: video['file']
                })
    
                videoUrl = url.split('?')[0]
                console.log(videoUrl)
            }
            
            dispatch({
                type: 'CREATE_NEW_POST',
                payload: {
                    postTitle: postTitle,
                    postBody: postBody,
                    postImage: imageUrl,
                    postVideo: videoUrl,
                    postTag: outcomeTag,
                    history: history
                }
            })
        }
    }

    const cancelPost = () => {
        // SweetAlert warning before demoting member
        Swal.fire({
            title: `Are you sure you want to cancel your post?`,
            text: "Click OK to Cancel",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel Post!',
            cancelButtonText: 'No, Keep My Post!',
            reverseButtons: true
        }).then((result) => {
            // clicking 'OK' sends dispatch to demote user
            if (result.isConfirmed) {

                dispatch({
                    type: 'CLEAR_VIDEO'
                })
                dispatch({
                    type: 'CLEAR_IMAGE'
                })
                dispatch({
                    type: 'CLEAR_POST'
                })
                
                Swal.fire(
                    'Canceled Post!',
                )

                history.push('/posts')
            }
        })
    }
    
    return (
        <Container>
            
            <h2>Add Post</h2>
            <Box 
                component={Paper}
                sx={{
                    padding: '15px',
                    borderRadius: '7px',
                    border: '1px solid black',
                    boxShadow: 10,
                    minHeight: '50vh'
                }}
            >
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        defaultValue={postTitle}
                        style={{
                            marginBottom: 15,
                            minWidth: '100%'
                        }}
                        onChange={(event) => setPostTitle(event.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        required
                        id="outlined-multiline-static"
                        label="Body"
                        multiline
                        rows={4}
                        defaultValue={postBody}
                        style={{
                            marginBottom: 15,
                            minWidth: '100%'
                        }}
                        onChange={(event) => setPostBody(event.target.value)}
                    />
                </Box>
                <Box>
                    <FormControl required sx={{minWidth: 150}}>
                        <InputLabel id="demo-simple-select-autowidth-label">Outcome Tag</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={outcomeTag}
                            label="Outcome Tag"
                            required
                            autoWidth
                            style={{
                                marginBottom: 15
                            }}
                            onChange={(event) => setOutcomeTag(event.target.value)}
                            >
                                {outcomesList?.map(outcome => {
                                    return (
                                        <MenuItem 
                                            key={outcome.id} 
                                            value={outcome.id}
                                        >{outcome.outcome}</MenuItem>
                                    )
                                })}
                            </Select>
                    </FormControl>
                </Box>
                <Box>
                    {image.file ?
                        <Box>
                            <p>{image.file.name}</p>
                            <Button 
                                onClick={handleChangeImage}
                                style={{
                                    marginBottom: 15,
                                }}
                            >Remove Photo
                            </Button> 
                        </Box>
                        : 
                        <Button 
                            onClick={handleOpenImageModal}
                            style={{
                                marginBottom: 15,
                            }}
                        >Add Photo
                        </Button>
                    }
                    {video.file ?
                        <Box>
                            <p>{video.file.name}</p>
                            <Button 
                                onClick={handleChangeVideo}
                                style={{
                                    marginBottom: 15,
                                }}
                            >Remove Video
                            </Button> 
                        </Box>
                        : 
                        <Button 
                            onClick={handleOpenVideoModal}
                            style={{
                                marginBottom: 15,
                            }}
                        >Add Video
                        </Button>
                    }
                </Box>
                <Modal
                    open={openImageModal}
                    onClose={handleCloseImageModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{
                        marginBottom: 15,
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        borderRadius: '7px',
                        boxShadow: 10,
                        p: 4,
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Photo Here!
                    </Typography>
                    {image.file ? 
                        <h1>{image.file.name} Has Been Added!</h1>
                        : 
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmitImage}
                            maxFiles={1}
                            inputContent={(files, extra) => (extra.reject ? 
                                'Image files only' 
                                : 
                                'Click or Drag 1 Image Here'
                            )}
                            styles={{
                            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                            dropzone: { width: '100%', minHeight: 250, maxHeight: 250, textAlign: 'center' },
                            dropzoneActive: { borderColor: "green" }
                            }}
                            accept="image/*"
                        />
                    }
                    </Box>
                </Modal>
                <Modal
                    open={openVideoModal}
                    onClose={handleCloseVideoModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{
                        marginBottom: 15,
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        borderRadius: '7px',
                        boxShadow: 10,
                        p: 4,
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Video Here!
                    </Typography>
                    {video.file ? 
                        <h1>{video.file.name} Has Been Added!</h1>
                        : 
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmitVideo}
                            maxFiles={1}
                            inputContent={(files, extra) => (extra.reject ? 
                                'Video files only' 
                                : 
                                'Click or Drag 1 Video Here'
                            )}
                            styles={{
                            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                            dropzone: { width: '100%', minHeight: 250, maxHeight: 250, textAlign: 'center' },
                            dropzoneActive: { borderColor: "green" }
                            }}
                            accept="video/*"
                        />}
                    </Box>
                </Modal>
                <Box>
                    <Button 
                        sx={{
                            backgroundColor: '#4E9BB9',
                            margin: '2px'
                        }} 
                        variant="contained" 
                        onClick={handleClick} 
                    >Submit Post</Button>
                    <Button 
                        sx={{
                            backgroundColor: 'red',
                            margin: '2px'
                        }} 
                        variant="contained" 
                        onClick={cancelPost} 
                    >Cancel</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddPostPage;
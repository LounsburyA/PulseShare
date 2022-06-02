import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';


import '../AddPostPage/AddPostPage.css'

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
import SendIcon from '@mui/icons-material/Send';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// import for sweetalert2
import Swal from 'sweetalert2'

// imports for file upload
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

// import for playing videos on dom
import ReactPlayer from 'react-player'

function EditPost({ setEditMode }) {


    const dispatch = useDispatch();

    const image = useSelector(store => store.imageReducer);
    const video = useSelector(store => store.videoReducer);
    const post = useSelector(store => store.post);
    const editPost = useSelector(store => store.editPostReducer);
    const outcomesList = useSelector(store => store.outcomesListReducer);

    let imageUrl = '';
    let videoUrl = '';

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
        const imageToUpload = files[0];
        dispatch({
            type: 'SET_IMAGE',
            payload: imageToUpload
        })
        // Empties Dropzone 
        allFiles.forEach(f => f.remove())
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmitVideo = (files, allFiles) => {
        const videoToUpload = files[0];
        dispatch({
            type: 'SET_VIDEO',
            payload: videoToUpload
        })
        // Empties Dropzone 
        allFiles.forEach(f => f.remove())
    }

    // function will clear image reducer and allow user to input new media
    const handleChangeImage = () => {
        dispatch({
            type: 'CLEAR_IMAGE'
        })
    }

    // function will clear video reducer and allow user to input new media
    const handleChangeVideo = () => {
        dispatch({
            type: 'CLEAR_VIDEO'
        })
    }

    // Update and store the information to edit as it is being input
    const handleChange = (event, property) => {
        dispatch({
            type: 'EDIT_POST_ON_CHANGE',
            payload: { property: property, value: event.target.value }
        })
    }

    const handleClick = async () => {



        if (image.file) {
            // get secure url from our server
            const { url } = await fetch("/s3Url/image").then(res => res.json())
            // post the image directly to the s3 bucket
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: image['file']
            })
            imageUrl = url.split('?')[0]
        }

        if (video.file) {
            const { url } = await fetch("/s3Url/video").then(res => res.json())

            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "video/mp4"
                },
                body: video['file']
            })
            videoUrl = url.split('?')[0]
        }

        // Check if new video or image has been added
        // Update anything AND both image and video
        if (image.file && video.file) {
            dispatch({
                type: 'UPDATE_POST',

                payload: {
                    id: editPost.id,
                    title: editPost.title,
                    post: editPost.post,
                    image: imageUrl,
                    video: videoUrl,
                    outcome_id: editPost.outcome_id

                },
                callback: setEditMode(false)
            })
        }
        // Update anything AND image
        else if (image.file) {
            dispatch({
                type: 'UPDATE_POST',

                payload: {
                    id: editPost.id,
                    title: editPost.title,
                    post: editPost.post,
                    image: imageUrl,
                    video: editPost.video,
                    outcome_id: editPost.outcome_id

                },
                callback: setEditMode(false)
            })
            // Update anything AND video
        } else if (video.file) {
            dispatch({
                type: 'UPDATE_POST',

                payload: {
                    id: editPost.id,
                    title: editPost.title,
                    post: editPost.post,
                    image: editPost.image,
                    video: videoUrl,
                    outcome_id: editPost.outcome_id

                },
                callback: setEditMode(false)
            })
            // Update anything BUT image or video
        } else {
            dispatch({
                type: 'UPDATE_POST',
                payload: editPost,
                callback: setEditMode(false)
            })
        }
    }

    // Cancel edit input
    const cancelEdit = () => {
        setEditMode(false);
        dispatch({ type: 'CLEAR_POST_EDIT' });
        dispatch({ type: 'CLEAR_IMAGE' });
        dispatch({ type: 'CLEAR_VIDEO' });
    }

    return (
        <Container >

            <h2>Edit Post</h2>
            <Box
                component={Paper}
                sx={{
                    padding: '15px',
                    borderRadius: '7px',
                    border: '1px solid black',
                    boxShadow: 10,
                    minHeight: '30vh'
                }}
            >
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        defaultValue={post.title}
                        style={{
                            marginBottom: 15,
                            minWidth: '100%'
                        }}
                        onChange={(event) => handleChange(event, 'title')}
                    />
                </Box>
                <Box>
                    <TextField
                        required
                        id="outlined-multiline-static"
                        label="Body"
                        multiline
                        rows={4}
                        defaultValue={post.post}
                        style={{
                            marginBottom: 15,
                            minWidth: '100%'
                        }}
                        onChange={(event) => handleChange(event, 'post')}
                    />
                </Box>
                <Box>
                    <FormControl required sx={{ minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Outcome Tag</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            defaultValue={post.outcome_id}
                            label="Outcome Tag"
                            required
                            autoWidth
                            style={{
                                marginBottom: 15
                            }}
                            onChange={(event) => handleChange(event, 'outcome_id')}
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
                                color='error'
                                style={{
                                    marginBottom: 15,
                                }}
                            >Remove Photo
                            </Button>
                        </Box>
                        :
                        <Button
                            onClick={handleOpenImageModal}
                            color='primary'
                            style={{
                                marginBottom: 15,
                            }}
                        >Update Photo
                        </Button>
                    }
                    {video.file ?
                        <Box>
                            <p>{video.file.name}</p>
                            <Button
                                onClick={handleChangeVideo}
                                color='error'
                                style={{
                                    marginBottom: 15,
                                }}
                            >Remove Video
                            </Button>
                        </Box>
                        :
                        <Button
                            onClick={handleOpenVideoModal}
                            color='primary'
                            style={{
                                marginBottom: 15,
                            }}
                        >Update Video
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
                            />}

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
                            <h1>Video Added!</h1>
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        color='primary'
                        sx={{
                            margin: '2px'
                        }}
                    ><SendIcon
                            sx={{
                                mr: 1
                            }}
                        />Submit Post</Button>
                    <Button
                        variant="contained"
                        onClick={cancelEdit}
                        color='error'
                        sx={{
                            margin: '2px'
                        }}
                    ><DoDisturbIcon
                            sx={{
                                mr: 1
                            }}
                        />Cancel</Button>
                </Box>
            </Box>

        </Container>
    );
}

export default EditPost;
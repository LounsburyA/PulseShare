//Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Styling Imports
import './AddCommentForm.css';
import { TextareaAutosize } from '@mui/base';
import { Paper, Container, Button, TextField, Box, Modal, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';
// imports for file upload
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

function AddCommentForm({ postId }) {
    // const user = useSelector(store => store.user);
    //     const history = useHistory();
    const image = useSelector(store => store.imageReducer);
    const video = useSelector(store => store.videoReducer);
    const [newComment, setNewComment] = useState('');
    // const editComment = useSelector(store => store.commentReducer);
    const dispatch = useDispatch();

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
        // if (postTitle === '' || postBody === '' || outcomeTag === '') {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Please fill all required fields!',
        //         footer: 'Title, Body, and Outcome Tag are all required to make a post.'
        //     })
        // } else {
        Swal.fire({
            title: 'Saving Comment and Image/Video!',
            html: 'Upload complete in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        });

        if (image.file) {
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

        if (video.file) {
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
            type: 'CREATE_NEW_COMMENT',
            payload: { post_id: postId, comment: newComment, image: imageUrl, video: videoUrl, }
        });
        setNewComment('');
        window.location.reload(false);
    }

    const cancelPost = () => {
        // SweetAlert warning before demoting member
        Swal.fire({
            title: `Are you sure you want to cancel your comment?`,
            text: "Click OK to Cancel",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel Comment!',
            cancelButtonText: 'No, Keep My Comment!',
            confirmButtonColor: '#327B5B',
            cancelButtonColor: '#AD3434',
            reverseButtons: true,
        }).then((result) => {
            // clicking 'OK' sends dispatch to demote user
            if (result.isConfirmed) {

                dispatch({
                    type: 'CLEAR_VIDEO'
                })
                dispatch({
                    type: 'CLEAR_IMAGE'
                })

                Swal.fire({
                    text: 'Canceled Comment',
                    confirmButtonColor: '#327B5B',
                })

                history.push('/posts')
            }
        })
    }

    const presentationComment = () => {
        setNewComment(`These settings worked really well! Thanks for sharing!`)
    }

    // const handleChange = (event) => {
    //   event.preventDefault();

    //   //dispatch action type for reducer to run, and payload (user input in state).
    //   dispatch({
    //     type: 'CREATE_NEW_COMMENT',
    //     payload: { post_id: postId, comment: newComment }
    //   });
    //   setNewComment('');
    // }

    return (
        <div className="container">
            <Typography 
            onClick={presentationComment}
            align="center" 
            variant='h5' 
            sx={{ mb: 2}}
            
            >Add a Comment</Typography>
            <Box component={Paper}
                sx={{
                    border: '1px solid black',
                    borderRadius: '7px',
                    padding: '15px',
                    boxShadow: 10,
                }}>
                <Paper elevation={5}>
                    <Container className="commentContainer">
                        <Box>
                            <TextField
                                elevation={15}
                                fullWidth
                                className="textField"
                                id="outlined-multiline-flexible"
                                label="Add Comment"
                                multiline
                                maxRows={20}
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)} type="text" placeholder="Comments"
                            />
                        </Box>
                    </Container>
                </Paper>
                {/* <Button onClick={handleClick}
          sx={{
            margin: '2px',
          }}
          color="primary"
          variant="contained"
          className='buttons'
        ><SendIcon /> Submit </Button> */}
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
                        >Add Photo
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
                <Box
                    sx={{
                        justifyContent: 'flex-end',
                        display: 'flex'
                    }}
                >
                    <Button
                        color='primary'
                        sx={{
                            margin: '2px'
                        }}
                        variant="contained"
                        onClick={handleClick}
                    ><SendIcon
                            sx={{
                                mr: 1
                            }}
                        />Submit</Button>
                    {newComment !== '' &&
                        <Button
                            color='error'
                            sx={{
                                margin: '2px'
                            }}
                            variant="contained"
                            onClick={cancelPost}
                        ><DoDisturbIcon
                                sx={{
                                    mr: 1
                                }}
                            />Cancel</Button>}
                </Box>
            </Box>

        </div>
    )
}

export default AddCommentForm;
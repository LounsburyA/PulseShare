//Imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//Styling Imports 
import {
    Paper,
    Box,
    Button,
    Container,
    ListItemAvatar,
    Avatar,
    Typography,
    Divider,
    ListItem,
    TextField,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';

// import for playing videos on dom
import ReactPlayer from 'react-player'

function CommentItem({ comment, postId }) {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const editComment = useSelector(store => store.editCommentReducer);

    const [editMode, setEditMode] = useState(true);

    // Submit edited comment, if null alert user to enter message
    const handleSubmit = () => {

        if (editComment.comment === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your comment in the comment field!',
                footer: 'Please fill the comment field to submit.'
            })
        } else {
            editComment.post_id = id;
            dispatch({
                type: 'PUT_COMMENT',
                payload: editComment,
                callback: setEditMode(true)
            })
        }
    }

    // Store comment changes in reducer
    const handleChange = (event) => {
        dispatch({
            type: 'EDIT_COMMENT_ON_CHANGE',
            payload: {
                property: 'comment',
                value: event.target.value
            }
        })
    }


    const handleCommentEdit = () => {
        //switch to edit mode "form"
        dispatch({
            type: 'SET_COMMENT_TO_EDIT',
            payload: comment
        })
        setEditMode(!editMode);
    }

    // Delete the post
    const deleteComment = () => {

        Swal.fire({
            title: `Are you sure you want to delete this comment?`,
            text: `This action cannot be undone.`,
            icon: 'warning',
            background: 'white',
            color: 'black',
            showCancelButton: true,
            confirmButtonColor: '#327B5B',
            cancelButtonColor: '#AD3434',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_COMMENT', payload: { id: comment.id, post_id: postId } })
                history.push(`/postDetail/${id}`)
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    confirmButtonColor: '#327B5B',
                    title: 'Deleted!',
                    text: `Comment has been deleted.`,
                    icon: 'success'
                })
            }
        })
    }

    const handlePhoto = () => {
        Swal.fire({
            title: comment.comment,
            text: comment.username,
            imageUrl: comment.image,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Image Modal',
        })
    }

    return (
        <ListItem alignItems="flex-start">
            <Container>


                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ListItemAvatar> {comment.profile_picture == '' ?
                        <Avatar alt="profile picture" src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" /> :
                        <Avatar alt="profile picture" src={comment.profile_picture} />}
                    </ListItemAvatar>
                </Stack>

                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                    >
                        {comment.username}

                    </Typography>
                    <Box
                        sx={{
                            justifyContent: 'space-evenly',
                            display: 'flex-start'
                        }}
                    >

                        <Typography sx={{ display: 'flex-start', marginLeft: '75px', textAlign: 'left', marginBottom: '25px', whiteSpace: "pre-line" }}>
                            <p>{comment.date} {comment.time}</p>
                            {editMode ?
                                <p>{comment.comment}</p> :
                                <Box
                                    sx={{
                                        border: '1px solid black',
                                        borderRadius: '7px',
                                        padding: '15px',
                                    }}>
                                    <Paper elevation={5}>
                                        <Container className="commentContainer">
                                            <Box>
                                                <TextField
                                                    elevation={15}
                                                    fullWidth
                                                    className="textField"
                                                    id="outlined-multiline-flexible"
                                                    label="Edit Your Comment"
                                                    multiline
                                                    maxRows={20}
                                                    value={editComment.comment}
                                                    onChange={(event) => handleChange(event)} type="text" placeholder="Comments"
                                                />
                                            </Box>
                                        </Container>
                                    </Paper>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <Button onClick={handleSubmit}
                                            sx={{
                                                margin: '2px',

                                            }}
                                            color="primary"
                                            variant="contained"
                                            className='buttons'
                                        ><SendIcon sx={{ mr: 1 }} /> Submit </Button>
                                    </Box>
                                </Box>}
                            <Box
                                sx={{
                                    justifyContent: 'center'
                                }}
                            >
                                <Box>
                                    {comment.video &&
                                        <ReactPlayer
                                            url={post.video}
                                            width='50vw'
                                            height='360px'
                                            controls={true} />}
                                </Box>
                                <br />
                                <Box onClick={handlePhoto}>
                                    {comment.image && <img className="hoverForPointer" src={comment.image} height="100px" />}
                                </Box>
                            </Box>



                        </Typography>
                    </Box>
                    <Box className="btn-holder">
                        {user.id === comment.user_id ?
                            editMode ?
                                <Button
                                    sx={{
                                        margin: '2px',
                                        marginBottom: '5px',
                                    }}
                                    color="primary"
                                    variant="contained"
                                    className='buttons'
                                    onClick={handleCommentEdit}
                                ><EditIcon sx={{ mr: 1 }} />Edit</Button> : <Button
                                    sx={{
                                        margin: '2px',
                                        marginBottom: '5px',
                                    }}
                                    color="primary"
                                    variant="contained"
                                    className='buttons'
                                    onClick={handleCommentEdit}
                                ><EditIcon />Cancel</Button> : <div></div>}
                        {(user.access_level >= 1 || user.id === comment.user_id) &&
                            <Button
                                variant="contained"
                                className='buttons'
                                color="error"
                                onClick={deleteComment}
                                sx={{
                                    margin: '2px',
                                    marginBottom: '5px'
                                }}
                            ><DeleteIcon sx={{ mr: 1 }} /> Delete </Button>}
                    </Box>
                </React.Fragment>


                <br />

                <Divider variant="inset" />
            </Container>
        </ListItem>
    )
}

export default CommentItem;
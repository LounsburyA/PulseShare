import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import EditPost from '../_EditPost/EditPost';
import AddCommentForm from '../_AddCommentForm/AddCommentForm';
import CommentList from '../_CommentList/CommentList';

// Basic CSS
import styling from './PostDetailPage.css'

// Sweet Alert 2
import Swal from 'sweetalert2';

// import for playing videos on dom
import ReactPlayer from 'react-player'

// Material UI
import {
    Box,
    Button,
    Container,
    Paper, Avatar,
    Typography,
    Chip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PostDetailPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const user = useSelector(store => store.user);
    const post = useSelector(store => store.post);
    const outcomesList = useSelector(store => store.outcomesListReducer);

    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        dispatch({
            type: 'GET_POST', payload: id
        });
        dispatch({
            type: 'GET_OUTCOMES_LIST'
        });
    }, [id]);

    // Navigate to poster's profile
    const sendToProfile = () => {
        history.push(`/profile/${post.user_id}`)
    }

    // Edit selected post
    const editPost = () => {
        console.log('Editing post', id);
        dispatch({ type: 'GET_POST_TO_EDIT', payload: id });
        setEditMode(true);
    }

    // Delete the post
    const deletePost = () => {

        Swal.fire({
            title: `Are you sure you want to delete this post?`,
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
                dispatch({ type: 'DELETE_POST', payload: id })
                history.push('/posts')
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    confirmButtonColor: '#327B5B',
                    title: 'Deleted!',
                    text: `Post has been deleted.`,
                    icon: 'success'
                })
            }
        })
    }

    const backToPrevious = () => {
        history.goBack();
    }


    return (

        <Container>

            <div>
                {editMode ?

                    <EditPost
                        setEditMode={setEditMode}
                        postId={id}
                    />

                    :
                    <Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={backToPrevious}
                                sx={{
                                    marginBottom: '15px'
                                }}
                            ><ArrowBackIcon />Back</Button>
                        </Box>

                        <Box
                            component={Paper}
                            sx={{
                                border: '1px solid black',
                                borderRadius: '7px',
                                padding: '15px',
                                boxShadow: 10,
                            }}
                        >


                            <Box
                                sx={{
                                    justifyContent: 'flex-start',
                                    display: 'flex'
                                }}
                            >
                                <Box
                                    sx={{
                                        margin: '15px',
                                        marginTop: '26px',
                                        textAlign: 'center',
                                        width: '150px',
                                        wordWrap: 'break-word',
                                        hyphens: 'auto'
                                    }}
                                >
                                    <a onClick={sendToProfile}>
                                        {post.profile_picture == '' ?
                                            <Avatar
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                }}
                                                className='profile-pic' src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="profile picture" />
                                            :
                                            <Avatar
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                }}
                                                className='profile-pic' src={post.profile_picture} alt="profile picture" />
                                        }
                                        <br />
                                        <h3>{post.username}</h3></a>
                                </Box>

                                <Box>
                                    <Typography variant='h4'>{post.title}</Typography>

                                    <p>{post.date} {post.time}
                                        <Chip
                                            label={outcomesList[post.outcome_id - 1]?.outcome}
                                            variant="outlined"
                                            sx={{
                                                bgcolor: '#5b7495',
                                                color: 'white',
                                                border: '1px solid #5b7495',
                                                marginLeft: '15px'
                                            }}
                                        />
                                    </p>


                                    {/* This will add line breaks if the user enters them */}
                                    {post !== '' &&
                                        <Typography style={{ whiteSpace: "pre-line" }}>
                                            {post?.post}
                                        </Typography>}

                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '15px'
                                }}
                            >
                                <Box
                                    sx={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Box>
                                        {post.video &&
                                            <ReactPlayer
                                                url={post.video}
                                                width='50vw'
                                                height='360px'
                                                controls={true} />}
                                    </Box>
                                    <br />
                                    <Box
                                        component='image'
                                    >
                                        {post.image && <img src={post.image} />}
                                    </Box>
                                </Box>

                            </Box>

                            <Box className="btn-holder">
                                {user.id === post.user_id &&
                                    <Button
                                        sx={{
                                            margin: '2px'
                                        }}
                                        color="primary"
                                        variant="contained"
                                        className='buttons'
                                        onClick={editPost}
                                    ><EditIcon sx={{ mr: 1 }} /> Edit </Button>}
                                {(user.access_level >= 1 || user.id === post.user_id) &&
                                    <Button
                                        variant="contained"
                                        color="error"
                                        className='buttons'
                                        onClick={deletePost}
                                        sx={{
                                            margin: '2px'
                                        }}
                                    ><DeleteIcon sx={{ mr: 1 }} /> Delete </Button>}
                            </Box>

                        </Box>
                    </Box>
                }
            </div>

            <div>
                <AddCommentForm postId={id} />

            </div>
            <div>
                <CommentList postId={id} />
            </div>


        </Container>

    );
}

export default PostDetailPage;
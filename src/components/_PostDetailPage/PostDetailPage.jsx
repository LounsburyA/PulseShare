import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AddCommentForm from '../_AddCommentForm/AddCommentForm';
import CommentList from '../_CommentList/CommentList';

// Basic CSS
import styling from './PostDetailPage.css'

// Sweet Alert 2
import Swal from 'sweetalert2';

// import for playing videos on dom
import ReactPlayer from 'react-player'

// Material UI
import { Box, Button, Container, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PostDetailPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const user = useSelector(store => store.user);
    const post = useSelector(store => store.post);


    useEffect(() => {
        dispatch({ type: 'GET_POST', payload: id });
    }, [id]);

    // Navigate to poster's profile
    const sendToProfile = () => {
        history.push(`/profile/${post.user_id}`)
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
            confirmButtonColor: '#4E9BB9',
            cancelButtonColor: 'red',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'DELETE_POST', payload: id})
                history.push('/posts') 
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    confirmButtonColor: '#4E9BB9',
                    title: 'Deleted!',
                    text: `Post has been deleted.`,
                    icon: 'success'
                })
            }
        })
    }

    console.log('POST IS', post);
    return (
        <Container>

            <Box
                component={Paper}
                sx={{
                    border: '1px solid black',
                    borderRadius: '7px',
                    padding: '15px',
                }}
            >

                <Box
                    sx={{
                        justifyContent: 'space-evenly',
                        display: 'flex'
                    }}
                >
                    <Box
                        sx={{
                            margin: '15px',
                            marginTop: '26px',
                            textAlign: 'center'
                        }}
                    >
                        <a onClick={sendToProfile}>
                            {post.profile_picture == '' ?
                            <img className='profile-pic' src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="profile picture" /> :
                            <img className='profile-pic' src={post.profile_picture} alt="profile picture" />  
                            }
                            <br />
                            <h3>{post.username}</h3></a>
                    </Box>

                    <Box>
                        <h2>{post.title}</h2>
                        <p>{post.date} {post.time}</p>

                        <p>{post.post}</p>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '15px'
                    }}
                >
                    <Box>
                        {post.video &&
                            <ReactPlayer
                                url={post.video}
                                width='640px'
                                height='360px'
                                controls={true} />}
                    </Box>
                    <br />
                    <Box>
                        {post.image &&
                            <img
                                src={post.image}
                                maxheight='360px'
                                maxwidth='640px'
                            />}
                    </Box>
                    
                </Box>

                <Box className="btn-holder">
                    {user.id === post.user_id &&
                        <Button
                            sx={{
                                backgroundColor: '#4E9BB9',
                                margin: '2px'
                            }}
                            variant="contained"
                            className='buttons'
                        ><EditIcon /> Edit </Button>}
                    {(user.access_level >= 1 || user.id === post.user_id) &&
                        <Button
                            variant="contained"
                            className='buttons'
                            onClick={deletePost}
                            sx={{
                                backgroundColor: 'red',
                                margin: '2px'
                            }}
                        ><DeleteIcon /> Delete </Button>}
                </Box>

            </Box>



            <div>
                <AddCommentForm postId={id} />

            </div>
            <div>
                <CommentList postId={id}/>
            </div>


        </Container>

    );
}

export default PostDetailPage;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Box, Button, Paper, ListItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import './HistoryItem.css'


function HistoryItem({ post }) {

    const history = useHistory();
    const dispatch = useDispatch();

    // function to delete a post
    const handleDelete = () => {

        // SweetAlert to warn user of deletion
        Swal.fire({
            title: `Are you sure you want to delete your post titled '${post.title}' ?`,
            text: "Click OK to Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete the post.',
            cancelButtonText: 'No, Cancel!',
            confirmButtonColor: '#327B5B',
            cancelButtonColor: '#AD3434',
            reverseButtons: true
        }).then((result) => {
            // clicking 'OK' sends dispatch to delete post
            if (result.isConfirmed) {

                dispatch({
                    type: 'DELETE_POST',
                    payload: post.id
                })
                Swal.fire({
                    title: 'Delete!',
                    text: `You have deleted your post.`,
                    icon: 'success',
                    confirmButtonColor: '#327B5B',
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire({
                    title: 'Cancelled',
                    text: `Delete cancelled.`,
                    icon: 'error',
                    confirmButtonColor: '#327B5B',
                })
            }
        })

    }

    return (
        <>
            <ListItem
                sx={{

                    borderRadius: '7px',
                    padding: '7px',

                }}
            >
                <Box
                    component={Paper}
                    sx={{
                        border: '1px solid black',
                        borderRadius: '7px',
                        padding: '10px',
                        margin: '2px',
                        boxShadow: 5,
                        width: '800',
                        minWidth: '60vw',
                        maxWidth: '60vw'
                    }}
                >
                    <Box>
                        {/* clicking post title pushes user to that post */}
                        <h2 className="postTitle" onClick={() => { history.push(`/postDetail/${post.id}`) }}>{post.title}</h2>
                        <p>{post.date} {post.time}</p>
                        <p>{post.post}</p>
                    </Box>

                    <Box className="btn-holder">
                        <Button
                            // click of view post button pushes user to that post
                            onClick={() => { history.push(`/postDetail/${post.id}`) }}
                            color='primary'
                            sx={{
                                margin: '2px'
                            }}
                            variant="contained"
                            className='buttons'
                        ><VisibilityIcon sx={{ mr: 1 }} /> VIEW POST </Button>
                        <Button
                            // click of delete button calls handleDelete function
                            onClick={handleDelete}
                            variant="contained"
                            className='buttons'
                            color='error'
                            sx={{
                                margin: '2px'
                            }}
                        ><DeleteIcon sx={{ mr: 1 }} /> Delete </Button>
                    </Box>
                </Box>
            </ListItem>
        </>
    )
}


export default HistoryItem;
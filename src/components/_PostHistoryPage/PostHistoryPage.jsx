import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List, Container } from '@mui/material'
import HistoryItem from '../_HistoryItem/HistoryItem';
import { Typography } from '@mui/material';

function PostHistoryPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const postHistory = useSelector(store => store.postHistoryReducer);

    // dispatch will get the user's post history and set it in the postHistoryReducer
    useEffect(() => {
        dispatch({
            type: 'GET_POST_HISTORY'
        })
    }, [])

    return (
        <div>
            <Typography
                align="center"
                variant='h4'
                sx={{ mb: 2 }}
            >{user.username}'s Post History</Typography>
            <Container


                sx={{
                    margin: 'auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <List>
                    {/* map through the postHistoryReducer */}
                    {postHistory.map(post => {
                        return (
                            <HistoryItem
                                key={post.id}
                                post={post}
                            />
                        )
                    })}
                </List>
            </Container>

        </div>
    );
}

export default PostHistoryPage;
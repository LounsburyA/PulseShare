import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './PostListItem.css'

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
    FormControl,
    Avatar,
    ListItem,
    List,
    Divider,
    ListItemAvatar,
    ListItemText,
    Chip
} from '@mui/material';

function PostListItem({ post }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const outcomesList = useSelector(store => store.outcomesListReducer);

    const handleClick = () => {
        history.push('')
    }


    return (
        <Box
            component={Paper}
            sx={{
                padding: '15px',
                borderRadius: '7px',
                border: '1px solid black',
                boxShadow: 10,
                marginBottom: '15px',
                minWidth: '60vw',
                maxWidth: '60vw',
            }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingRight: 3
                    }}>
                    <Avatar className="hoverForPointer" alt="Profile Picture" src={post.profile_picture} onClick={() => { history.push(`/profile/${post.user_id}`) }} />
                    <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        <a onClick={() => { history.push(`/profile/${post.user_id}`) }}>{post.username}</a>
                    </Typography>
                </ListItemAvatar>
                <Box
                    className="hoverForPointer"
                    onClick={() => { history.push(`/postDetail/${post.id}`) }}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <ListItemText
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        primary={
                            <Box>
                                <Typography
                                    component="span"
                                    variant="h4"
                                    color="text.primary"

                                >
                                    {post.title}
                                </Typography>
                                <br />
                                <Typography
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {post.post}
                                </Typography>
                            </Box>
                        }
                        secondary={
                            <React.Fragment>
                                <Box sx={{
                                    marginTop: '10px'
                                }}>
                                    {post.date} {post.time}
                                </Box>

                                <br />
                                <Chip
                                    label={outcomesList[post.outcome_id - 1]?.outcome}
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#4E9BB9',
                                        color: 'white',
                                        border: '1px solid #4E9BB9'
                                    }}
                                />
                            </React.Fragment>
                        }
                    />
                </Box>
            </ListItem>
        </Box>
    );
}

export default PostListItem;
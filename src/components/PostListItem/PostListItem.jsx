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

    const postLengthCheck = () => {
        if (post.post.length > 150) {
            return post.post.substring(0, 150) + '.....'
        } else {
            return post.post
        }
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
                    <Avatar
                        className="hoverForPointer"
                        alt="Profile Picture"
                        src={post.profile_picture}
                        onClick={() => { history.push(`/profile/${post.user_id}`) }}
                    />
                </ListItemAvatar>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%'
                    }}
                >
                    <ListItemText
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        primary={
                            <Box
                                className="hoverForPointer"
                                onClick={() => { history.push(`/postDetail/${post.id}`) }}
                            >
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
                                    sx={{ whiteSpace: "pre-line" }}
                                >
                                    {postLengthCheck()}
                                </Typography>
                            </Box>
                        }
                        secondary={
                            <React.Fragment>
                                <Box sx={{
                                    marginTop: '10px'
                                }}>
                                    Posted by: <a
                                        onClick={() => { history.push(`/profile/${post.user_id}`) }}>{post.username}
                                    </a> {post.date} @ {post.time}
                                </Box>

                                <br />
                                <Chip
                                    label={outcomesList[post.outcome_id - 1]?.outcome}
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#5b7495',
                                        color: 'white',
                                        border: '1px solid #5b7495'
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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostListItem from '../PostListItem/PostListItem';

import './ForumPage.css'

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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ForumPage() {
    useEffect(() => {
        dispatch({
            type: 'GET_ALL_POSTS'
        });
        dispatch({
            type: 'GET_OUTCOMES_LIST'
        });
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const postList = useSelector(store => store.postListReducer);
    const outcomesList = useSelector(store => store.outcomesListReducer);
    const [searchKeyword, setSearchKeyword] = useState();

    const [outcomeTag, setOutcomeTag] = useState('');

    // Filter by keyword search if entered
    const handleChange = (event) => {

        const keyword = event.target.value;

        if (keyword.length < 1) {
            dispatch({
                type: 'GET_ALL_POSTS'
            })
        } else {
            dispatch({
                type: 'SEARCH_BY_KEYWORD',
                payload: keyword
            })
        }
    }

    // Send user to addPost
    const handleClick = () => {
        history.push('/addPost')
    }

    // Filter posts by outcome
    const handleSearchByOutcome = (event) => {
        dispatch({
            type: 'GET_POSTS_BY_OUTCOME',
            payload: event.target.value
        });
        setOutcomeTag(event.target.value)
    }

    // Reset page
    const handleReset = () => {
        window.location.reload(false);
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography
                align="center"
                variant='h4'
                sx={{ mb: 2 }}
            >The Pulse</Typography>
            <Box
                sx={{
                    width: '83%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    mb: 2
                }}>

                <FormControl sx={{ minWidth: 150 }}>

                    <InputLabel id="demo-simple-select-autowidth-label">Outcomes</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={outcomeTag}
                        label="Outcomes"


                        onChange={(event) => handleSearchByOutcome(event)}
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

                <Box sx={{
                    display: 'flex'
                }}>
                    <TextField
                        label="Search"

                        variant="filled"
                        value={searchKeyword}
                        onChange={(event) => handleChange(event)}
                        sx={{ width: 300 }}
                    />
                    <Button
                        // click of reset search button re-renders page and clears input
                        onClick={handleReset}
                        variant="contained"
                        color='primary'
                        sx={{
                            margin: '2px',
                            ml: 2,
                            height: '36px',
                            mt: 1.3,
                            // mb: 2
                        }}
                    >Reset Search</Button>
                </Box>

                <Box>
                    <Button
                        sx={{
                            backgroundColor: '#327b5b',
                            alignItems: 'center',
                        }}
                        variant="contained"
                        onClick={handleClick}
                    ><AddIcon sx={{ mr: 1 }} />Add Post
                    </Button>
                </Box>
            </Box>

            {postList?.map(post => {
                return (
                    <PostListItem
                        key={post.id}
                        post={post}
                    />
                )
            })}

        </Container>
    );
}

export default ForumPage;
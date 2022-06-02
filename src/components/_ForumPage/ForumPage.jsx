import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostListItem from '../_PostListItem/PostListItem';

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
    ListItemText
} from '@mui/material';

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
            console.log(keyword);
        }
    }

    const handleClick = () => {
        history.push('/addPost')
    }

    const handleSearchByOutcome = (event) => {
        dispatch({
            type: 'GET_POSTS_BY_OUTCOME',
            payload: event.target.value
        });
        setOutcomeTag(event.target.value)
    }

    const handleReset = () => {
        window.location.reload(false);

    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2>Forum Page</h2>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    mb:2
                }}>
                <Button
                    sx={{
                        backgroundColor: '#327b5b',
                        margin: '2px',
                    }}
                    variant="contained"
                    onClick={handleClick}
                >Add Post
                </Button>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Outcomes</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={outcomeTag}
                        label="Outcomes"
                        autoWidth

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
                    <Box>
                        <TextField
                            label="keyword"
                            helperText="KEYWORD SEARCH FOR A POST"
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
                                mt: 2
                            }}
                        >Reset Search</Button>
                    </Box>
                </FormControl>
            </Box>
            {/* <List sx={{ 
                width: '100%', 
                maxWidth: 800, 
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                
            }}> */}
            {postList?.map(post => {
                return (
                    <PostListItem 
                        key={post.id}
                        post={post}
                    />
                )
            })}
            {/* </List> */}
        </Container>
    );
}

export default ForumPage;
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
    const outcomesList = useSelector( store => store.outcomesListReducer);

    const [outcomeTag, setOutcomeTag] = useState('');

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
                }}>
                <Button 
                    sx={{
                        backgroundColor: '#4E9BB9',
                        margin: '2px',
                    }}
                    variant="contained" 
                    onClick={handleClick}
                >Add Post
                </Button>
                <FormControl sx={{minWidth: 150}}>
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
                </FormControl>
            </Box>
            <List sx={{ 
                width: '100%', 
                maxWidth: 800, 
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                
            }}>
            {postList?.map(post => {
                return (
                    <PostListItem 
                        key={post.id}
                        post={post}
                    />
                )
            })}
            </List>
        </Container>
    );
}

export default ForumPage;
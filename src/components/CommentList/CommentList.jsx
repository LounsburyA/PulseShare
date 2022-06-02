//Imports
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentItem from '../CommentItem/CommentItem';

//Styling Imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper, Container, Button, TextField, Box } from '@mui/material';



function CommentList({ postId }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector(store => store.comment);


    //Display comments in DB on page load
    useEffect(() => {
        dispatch({ type: 'GET_COMMENTS', payload: postId });
    }, [postId]);

    //Render Return maps over comment list from DB making an item for each comment of the list
    return (
        <main>
            {comments.length === 0 ?
                <div><h3>Be the first to comment!</h3></div>
                :
                <>
                    <Typography
                        align="center"
                        variant='h5'
                        sx={{ mb: 2 }}
                    >Comments</Typography>
                    <Paper elevation={15}>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '7px',
                                padding: '15px',
                            }}>
                            <div className="comments">
                                <List sx={{
                                    bgcolor: 'background.paper', border: '1px solid black', borderRadius: '7px', padding: '15px', position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 600,
                                }}>

                                    {/* <button variant="primary" onClick={() => { history.push('/form') }}>Button Place Holder</button> */}
                                    <Paper elevation={15}>
                                        <section>
                                            {comments.map((comment) => {
                                                return (
                                                    <CommentItem
                                                        key={comment.id}
                                                        comment={comment}
                                                        postId={postId}

                                                    />
                                                );
                                            })}
                                        </section>
                                    </Paper>
                                </List>
                            </div>


                        </Box>
                    </Paper>
                </>
            }</main>
    );
}

export default CommentList;
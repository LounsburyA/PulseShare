import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
// import './CommentList.css'
// import MovieItem from '../MovieItem/MovieItem';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper, Container, Button, TextField, Box } from '@mui/material';

import CommentItem from '../_CommentItem/CommentItem';


// const useStyles = makeStyles({
//     root: {
//         background: 'linear-gradient(45deg, #DB1F1F 30%, #5C0D15 90%)',
//         border: 0,
//         borderRadius: 3,
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//         color: 'white',
//         height: 30,
//         padding: '0 30px',
//     },
// });

function CommentList( {postId} ) {

    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector(store => store.comment);
    // const classes = useStyles();

    // console.log('comments:', comments);

    //Display comments in DB on page load
    useEffect(() => {
        dispatch({ type: 'GET_COMMENTS', payload: postId});
    }, [postId]);

    //Render Return maps over comment list from DB making an item for each comment of the list
    return (
        <main>
        <h2>Comment List</h2>
        {/* <Box component={Paper}
        sx={{
          border: '1px solid black',
          borderRadius: '7px',
          padding: '15px',
        }}> */}
        <List sx={{ bgcolor: 'background.paper', border: '1px solid black', borderRadius: '7px', padding: '15px' }}>
            
                {/* <button variant="primary" onClick={() => { history.push('/form') }}>Button Place Holder</button> */}
                
                <section className="comments">
                    {comments.map((comment) => {
                        return (
                            <CommentItem
                                key={comment.id}
                                comment={comment}

                            />
                        );
                    })}
                </section>
            
            </List>
            {/* </Box> */}
            </main>
    );
}

export default CommentList;
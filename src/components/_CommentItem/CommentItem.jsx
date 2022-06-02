import React from 'react';
// import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import { Button, CardActionArea, CardActions } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Container, ListItemAvatar, Avatar, Typography, Divider, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';



// const useStyles = makeStyles({
//     root: {
//         maxWidth: 300,
//         margin: "3rem",
//     },
// });


function CommentItem({ comment }) {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    const history = useHistory()

    // const classes = useStyles();

    // useEffect(() => {
    //     dispatch({ type: 'GET_COMMENTS', payload: comment.post_id});
    // }, [id]);

    // const handleDetails = () => {
    //     // console.log('clicked for comment details (description)');
    //     dispatch({ type: 'FETCH_DETAILS', payload: comment.id });
    //     history.push('/details');
    // }

    // style={{width: 175, height: 375}}
    // style={{width: 175, height: 100}}  

    //Render return all comments in DB
    return (
        <ListItem alignItems="flex-start">
            <Container>
                {/* <Box
                component={Paper}
                sx={{
                    border: '1px solid black',
                    borderRadius: '7px',
                    padding: '15px',
                }}
            > */}
                {/* <ListItemAvatar >
                <Avatar alt=“Remy Sharp” src=“/static/images/avatar/1.jpg” />
                <Typography
                        component=“span”
                        variant=“body2”
                        color=“text.primary”
                    >
                        {post.username}
                    </Typography>
                </ListItemAvatar> */}
                                    {/* <Box
                        sx={{
                            margin: '15px',
                            marginTop: '26px',
                            textAlign: 'center'
                        }}
                    > */}

                <ListItemAvatar> {comment.profile_picture == '' ?
                    <Avatar alt="profile picture" src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="profile picture" /> :
                    <Avatar alt="profile picture" src={comment.profile_picture} />}
                </ListItemAvatar>
                {/* </Box> */}
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {comment.username}
                    {/* <br /> */}
                    </Typography>
                    <Box
                    sx={{
                        justifyContent: 'space-evenly',
                        display: 'flex-start'
                    }}
                >
                    <Typography sx={{ display: 'flex-start', marginLeft: '75px', textAlign: 'left', marginBottom:'25px' }}>
                    "{comment.comment}"
                    
                    </Typography>
                    </Box> 
                    <Box className="btn-holder">
                {user.id === comment.user_id ?
                    <Button
                        sx={{
                            backgroundColor: '#4E9BB9',
                            margin: '2px',
                            marginBottom: '5px',
                        }}
                        variant="contained"
                        className='buttons'
                    ><EditIcon /> Edit </Button> : <div></div>} 
                {user.id === comment.user_id &&
                    <Button
                        variant="contained"
                        className='buttons'
                        sx={{
                            backgroundColor: 'red',
                            margin: '2px',
                            marginBottom: '5px'
                        }}
                    ><DeleteIcon /> Delete </Button>}                  
                </Box>
                </React.Fragment>
                
                {/* <p>Comment: "{comment.comment}" </p> */}
                <br />
               
                <Divider variant="inset" />
            </Container>
        </ListItem>
    )
}

export default CommentItem;
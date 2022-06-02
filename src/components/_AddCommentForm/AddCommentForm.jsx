//Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Styling Imports
import './AddCommentForm.css';
import { TextareaAutosize } from '@mui/base';
import { Paper, Container, Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function AddCommentForm({ postId }) {
  const dispatch = useDispatch();
  // const user = useSelector(store => store.user);
  //     const history = useHistory();

  let [newComment, setNewComment] = useState('');
  // const editComment = useSelector(store => store.commentReducer);



  const handleChange = (event) => {
    event.preventDefault();

    //dispatch action type for reducer to run, and payload (user input in state).
    dispatch({
      type: 'CREATE_NEW_COMMENT',
      payload: { post_id: postId, comment: newComment }
    });
    setNewComment('');
  }

  return (
    <div className="container">
      <h2>Add a Comment</h2>
      <Box component={Paper}
        sx={{
          border: '1px solid black',
          borderRadius: '7px',
          padding: '15px',
        }}>
        <Paper elevation={5}>
          <Container className="commentContainer">
            <Box>
              <TextField
                elevation={15}
                fullWidth
                className="textField"
                id="outlined-multiline-flexible"
                label="Add Comment"
                multiline
                maxRows={20}
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)} type="text" placeholder="Comments"
              />
            </Box>
          </Container>
        </Paper>
        <Button onClick={handleChange}
          sx={{
            backgroundColor: '#4E9BB9',
            margin: '2px',
          }}
          variant="contained"
          className='buttons'
        ><SendIcon /> Submit </Button>
      </Box>
    </div>
  )
}

export default AddCommentForm;
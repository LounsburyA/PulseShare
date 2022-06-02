//imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//styling imports
import './AddCommentForm.css';
import { TextareaAutosize } from '@mui/base';
import { Paper, Container, Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function AddCommentForm({ postId }) {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  //     const history = useHistory();

  let [newComment, setNewComment] = useState('');

  const handleChange = (event) => {
    event.preventDefault();

    //dispatch action type for reducer to run, and payload (user input in state).
    dispatch({
      type: 'CREATE_NEW_COMMENT',
      payload: { post_id: postId, comment: newComment }
    })
    // //Onclick, push new location to useHistory, changed location.
    // history.push('/comments');
  }
  // const user = useSelector((store) => store.user);
  // useEffect(() => {
  // dispatch({ type: 'CREATE_NEW_COMMENT' });
  // }, []);


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
                label="Add Comment Here"
                multiline
                maxRows={20}
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)} type="text" placeholder="Comments"
              />
              {/* <Box className="btn-holder">
                    {user.id === comment.user_id &&
                        <Button
                            sx={{
                                backgroundColor: '#4E9BB9',
                                margin: '2px'
                            }}
                            variant="contained"
                            className='buttons'
                        ><EditIcon /> Edit </Button>}
                    {user.id === comment.user_id &&
                        <Button
                            variant="contained"
                            className='buttons'
                            sx={{
                                backgroundColor: 'red',
                                margin: '2px'
                            }}
                        ><DeleteIcon /> Delete </Button>}
                </Box> */}

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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, CardMedia, CardContent } from '@mui/material';
import Swal from 'sweetalert2'

// imports for file upload
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
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
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid,
    Stack,

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';

import { display, maxWidth, width, spacing } from '@mui/system';






function ProfilePage({ profileId }) {
    // const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const profile = useSelector(store => store.profile);
    const editProfile = useSelector(store => store.editProfileReducer);
    const image = useSelector(store => store.imageReducer);
    let imageUrl = '';

    const [openImageModal, setOpenImageModal] = React.useState(false);
    const handleOpenImageModal = () => setOpenImageModal(true);
    const handleCloseImageModal = () => setOpenImageModal(false);

    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmitImage = (files, allFiles) => {
        console.log(files[0])
        const imageToUpload = files[0];
        console.log(imageToUpload['file']);

        dispatch({
            type: 'SET_IMAGE',
            payload: imageToUpload
        })

        // Empties Dropzone 
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }




    const [editMode, setEditMode] = useState(false);

    // gets all the profile information
    useEffect(() => {
        dispatch({ type: 'GET_PROFILE', payload: profileId });
        dispatch({
            type: 'CLEAR_POST'
        })
    }, [profileId]);



    // switches to post history view
    const toPostHistory = () => {
        history.push('/postHistory')
    }


    const handleUpdate = () => {
        //switch to edit mode "form"
        console.log('clicked update profile');
        dispatch({
            type: 'SET_PROFILE_TO_EDIT',
            payload: profile
        })
        setEditMode(!editMode);
    }



    const handleChange = (event, property) => {
        dispatch({
            type: 'EDIT_ON_CHANGE',
            payload: {
                property: property,
                value: event.target.value
            }
        })
    }

    // handles change of privacy settings for user account
    const handlePrivacy = (event) => {
        let privacy = event.target.value;
        dispatch({
            type: 'EDIT_PRIVACY',
            payload: { property: 'public', value: privacy }
        })
    }


    // function will clear media reducer and allow user to input new media
    const handleChangeImage = () => {
        dispatch({
            type: 'CLEAR_IMAGE'
        })
        profile.profile_picture = ''
    }


    const handleSubmit = async () => {
        // if title or body text fields are empty, won't submit

        // deal with the image if there is one
        if (image.file) {
            // get secure url from our server
            const { url } = await fetch("/s3Url/image").then(res => res.json())
            console.log(url)

            // post the image directly to the s3 bucket
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: image['file']
            })

            imageUrl = url.split('?')[0];

            console.log(imageUrl)

            // dispatch({
            //     type: 'EDIT_ON_CHANGE',
            //     payload: {
            //         property: 'profile_picture',
            //         value: imageUrl
            //     }
            // })



        } else {
            // no image, move along
            imageUrl = profile.profile_picture;
        }

        // send it all to the server

        // we blame kris for this hack
        editProfile.profile_picture = imageUrl;

        dispatch({
            type: 'PUT_PROFILE',
            payload: editProfile,
        });

        dispatch({ type: '  ' });

        setEditMode(!editMode);
    }

    //deletes entire user account, a confirmation/warning sweet alert presents to avoid accidental account deletion
    const handleDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete your profile?`,
            text: `This action cannot be undone.`,
            icon: 'warning',
            background: 'white',
            color: 'black',
            showCancelButton: true,
            confirmButtonColor: '#4E9BB9',
            confirmButtonColor: '#327B5B',
            cancelButtonColor: '#AD3434',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_PROFILE', payload: history })
                history.push('/profile/:id')
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    confirmButtonColor: '#327B5B',
                    title: 'Deleted!',
                    text: `Profile has been deleted.`,
                    icon: 'success'
                })
            }
        })
    }

    return (
        <>


            {/* STYLING FOR profile pic, pronouns, location, job title, company  */}
            <Stack
                direction='row'
                spacing={2}
                justifyContent="center"
                alignItems="center"

            >

                <Paper sx={{

                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 5,
                    overflow: 'auto',
                    maxWidth: '28%',
                    minWidth: '28%',
                    height: '40vh'

                }}>


                    {editMode ?
                        <>

                            <Box
                                component="img"
                                alt="profile picture"
                                src={profile.profile_picture}
                                sx={{ width: 250, height: 250, border: '1px solid #32527B', borderRadius: .5, boxShadow: 4 }}
                            ></Box>



                            <Box>
                                {image?.file || profile?.profile_picture ?
                                    <Box>
                                        <Button
                                            onClick={handleChangeImage}
                                            style={{
                                                marginBottom: 15,
                                            }}
                                        >Remove Photo
                                        </Button>
                                    </Box>
                                    :
                                    <Button
                                        onClick={handleOpenImageModal}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                    >Add Photo
                                    </Button>
                                }
                            </Box>

                            <Modal
                                open={openImageModal}
                                onClose={handleCloseImageModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                style={{
                                    marginBottom: 15,
                                    textAlign: 'center'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '50%',
                                    bgcolor: 'background.paper',
                                    border: '1px solid #000',
                                    borderRadius: '7px',
                                    boxShadow: 10,
                                    p: 4,
                                }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add Photo Here!
                                    </Typography>
                                    {image.file ?
                                        <h1>{image.file.name} Has Been Added!</h1>
                                        :
                                        <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            onSubmit={handleSubmitImage}
                                            maxFiles={1}
                                            inputContent={(files, extra) => (extra.reject ?
                                                'Image files only'
                                                :
                                                'Click or Drag 1 Image Here'
                                            )}
                                            styles={{
                                                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                                                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                                                dropzone: { width: '100%', minHeight: 250, maxHeight: 250, textAlign: 'center' },
                                                dropzoneActive: { borderColor: "green" }
                                            }}
                                            accept="image/*"
                                        />}
                                </Box>
                            </Modal>
                        </>

                        :

                        <Box>
                            {profile?.profile_picture === '' ?
                                <Box
                                    component="img"
                                    alt="profile picture"
                                    src='https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                                    sx={{ width: 200, height: 200 }}
                                ></Box>

                                :

                                <Box
                                    component="img"
                                    alt="profile picture"
                                    src={profile.profile_picture}
                                    sx={{ width: 200, height: 200 }}
                                ></Box>
                            }
                        </Box>
                    }



                    <Box sx={{
                        width: '300px',
                        hyphens: 'auto',
                        wordWrap: 'break-word',

                    }}>
                        <strong>User Name: </strong>{profile.username}
                    </Box>


                    <Box><strong>Pronouns: </strong></Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.pronouns}
                        onChange={(event) => handleChange(event, 'pronouns')}
                    /> : <Box>{profile.pronouns}</Box>}



                    <Box> <strong> Location: </strong></Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.location}
                        onChange={(event) => handleChange(event, 'location')}
                    /> : <Box>{profile.location}</Box>}

                    <Box>  <strong>Job Title: </strong></Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.job_title}
                        onChange={(event) => handleChange(event, 'job_title')}
                    /> : <Box>{profile.job_title}</Box>}

                    <Box>    <strong>Company: </strong></Box>

                    {editMode ? <TextField
                        type="text"
                        value={editProfile.company}
                        onChange={(event) => handleChange(event, 'company')}
                    /> : <Box>{profile.company}</Box>}


                </Paper>



                {/* ABOUT ME STYLING HERE */}
                <Paper sx={{
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 5,
                    minWidth: '52%',
                    maxWidth: '52%',
                    height: '40vh',
                    overflowY: 'scroll'
                }}>

                    <h1>About Me</h1>

                    <Box>
                        {editMode ? <TextField
                            type="text"
                            value={editProfile.about_me}
                            multiline
                            maxRows={12}
                            fullWidth
                            onChange={(event) => handleChange(event, 'about_me')}
                        /> : <Box>{profile.about_me}</Box>}
                    </Box>
                </Paper>
            </Stack>

            {/* DEVICE STYLING HERE */}
            <Stack
                direction='row'
                spacing={2}
                sx={{ mt: 2 }}
                justifyContent="center"
                alignItems="center"

            >

                <Paper sx={{

                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 5,
                    minWidth: '40%',
                    maxWidth: '40%',
                    overflowY: 'scroll',
                    height: '40vh'


                }}>

                    <h1>Device Information</h1>

                    <Box><strong>Device: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.device}
                        onChange={(event) => handleChange(event, 'device')}
                    /> : <Box>{profile.device}</Box>}


                    <Box><strong>Device Settings: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.device_settings}
                        onChange={(event) => handleChange(event, 'device_settings')}
                    /> : <Box>{profile.device_settings}</Box>}


                    <Box><strong>Baseline: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.baseline}
                        onChange={(event) => handleChange(event, 'baseline')}
                    /> : <Box>{profile.baseline}</Box>}


                    <Box><strong>Improvements: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.improvements}
                        multiline
                        maxRows={6}
                        onChange={(event) => handleChange(event, 'improvements')}
                    /> : <Box>{profile.improvements}</Box>}

                </Paper>





                {/* BIOMETRICS STYLING HERE */}
                <Paper sx={{
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 5,
                    minWidth: '40%',
                    maxWidth: '40%',
                    overflowY: 'scroll',
                    height: '40vh'
                }}>
                    <h1>Biometrics</h1>

                    <Box><strong>Age: </strong></Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.age}
                        onChange={(event) => handleChange(event, 'age')}
                    /> : <Box>{profile.age}</Box>}


                    <Box><strong>Weight: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.weight}
                        onChange={(event) => handleChange(event, 'weight')}
                    /> : <Box>{profile.weight}</Box>}

                    <Box><strong>Height: </strong>  </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.height}
                        onChange={(event) => handleChange(event, 'height')}
                    /> : <Box>{profile.height}</Box>}


                    <Box><strong>Injury Level: </strong>  </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.injury_level}
                        onChange={(event) => handleChange(event, 'injury_level')}
                    /> : <Box>{profile.injury_level}</Box>}


                    <Box><strong>Biological Gender: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.biological_gender}
                        onChange={(event) => handleChange(event, 'biological_gender')}
                    /> : <Box>{profile.biological_gender}</Box>}

                    <Box><strong>Aisa Level:</strong>  </Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.aisa_level}
                        onChange={(event) => handleChange(event, 'aisa_level')}
                    /> : <Box>{profile.aisa_level}</Box>}

                    <Box><strong>Time Since Injury: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        multiline
                        value={editProfile.time_since_injury}
                        onChange={(event) => handleChange(event, 'time_since_injury')}
                    /> : <Box>{profile.time_since_injury}</Box>}


                    <Box><strong>Medical Condition: </strong> </Box>
                    {editMode ? <TextField
                        type="text"
                        multiline
                        maxRows={5}
                        fullWidth
                        value={editProfile.medical_conditions}
                        onChange={(event) => handleChange(event, 'medical_conditions')}
                    /> : <Box >{profile.medical_conditions}</Box>}


                </Paper>

            </Stack>


            {
                editMode ?
                    <Container
                        sx={{
                            padding: 3
                        }}

                    >
                        <FormControl >
                            <h3>Profile Privacy</h3>
                            <RadioGroup
                                onChange={handlePrivacy}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={editProfile.public}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Visible to Anyone" />
                                <FormControlLabel value={1} control={<Radio />} label="Visible to Users" />
                                <FormControlLabel value={2} control={<Radio />} label="Private, no one can see profile details." />
                            </RadioGroup>
                        </FormControl>
                    </Container> : ''
            }


            {
                user.id == profileId && <Container
                    sx={{
                        padding: 3
                    }}
                >
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={toPostHistory}>
                        <HistoryIcon
                            sx={{ mr: 1 }}
                        />Post History</Button >
                    {editMode ?
                        <Button
                            variant="contained"
                            color='primary'
                            sx={{ margin: 1 }}
                            onClick={handleSubmit}>
                            <SendIcon
                                sx={{ mr: 1 }}
                            />Submit</Button>
                        :
                        <Button
                            variant="contained"
                            color='primary'
                            sx={{ margin: 1 }}
                            onClick={handleUpdate}>
                            <EditIcon sx={{ mr: 1 }} />Update Profile</Button>}
                    {editMode ?
                        <Button
                            variant="contained"
                            color='error'
                            onClick={handleDelete}>
                            <DeleteIcon sx={{ mr: 1 }} />Delete Account</Button>
                        :
                        ''}
                </Container>
            }


        </>
    );
}

export default ProfilePage;





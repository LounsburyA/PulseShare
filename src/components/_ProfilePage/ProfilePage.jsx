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
    FormControlLabel
} from '@mui/material';
import { display, maxWidth, width } from '@mui/system';






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
    useEffect(() => {
        dispatch({ type: 'GET_PROFILE', payload: profileId });
        dispatch({
            type: 'CLEAR_POST'
        })
    }, [profileId]);




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

    // const handleSubmit = () => {
    //     console.log('save clicked');

    //     dispatch({
    //         type: 'PUT_PROFILE',
    //         payload: editProfile
    //     })
    //     dispatch({ type: 'CLEAR_EDIT' });
    //     setEditMode(!editMode);
    // }



    const handleChange = (event, property) => {
        dispatch({
            type: 'EDIT_ON_CHANGE',
            payload: {
                property: property,
                value: event.target.value
            }
        })
    }
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

        dispatch({ type: 'CLEAR_EDIT' });

        setEditMode(!editMode);
    }


    const handleDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete your profile?`,
            text: `This action cannot be undone.`,
            icon: 'warning',
            background: 'white',
            color: 'black',
            showCancelButton: true,
            confirmButtonColor: '#4E9BB9',
            cancelButtonColor: 'red',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_PROFILE', payload: user.id })
                //history.push('/profile') 
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    confirmButtonColor: '#4E9BB9',
                    title: 'Deleted!',
                    text: `Profile has been deleted.`,
                    icon: 'success'
                })
            }
        })



    }




    return (
        <>





            <Paper sx={{
                gap: 2,
                borderRadius: 2,
                border: 1,
                padding: 3,
                display: 'inline-block',
                margin: 1,
                boxShadow: 10

            }}>

                {editMode ?
                    <>
                        <Box
                            component="img"
                            alt="profile picture"
                            src={profile.profile_picture}
                            sx={{ width: 200, height: 200 }}
                        ></Box>


                        <Box>
                            {image?.file || profile?.profile_picture ?
                                <Box>
                                    <p>{image?.file?.name}</p>
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



                    <Box
                        component="img"
                        alt="profile picture"
                        src={profile.profile_picture}
                        sx={{ width: 200, height: 200 }}
                    ></Box>
                }



                <Box><strong>User Name: </strong>{profile.username}</Box>
                <Box><strong>Pronouns: </strong></Box>
                {editMode ? <input
                    type="text"
                    value={editProfile.pronouns}
                    onChange={(event) => handleChange(event, 'pronouns')}
                /> : <Box>{profile.pronouns}</Box>}



                <Box> <strong> Location: </strong></Box>
                {editMode ? <input
                    type="text"
                    value={editProfile.location}
                    onChange={(event) => handleChange(event, 'location')}
                /> : <Box>{profile.location}</Box>}

                <Box>  <strong>Job Title: </strong></Box>
                {editMode ? <input
                    type="text"
                    value={editProfile.job_title}
                    onChange={(event) => handleChange(event, 'job_title')}
                /> : <Box>{profile.job_title}</Box>}

                <Box>    <strong>Company: </strong></Box>

                {editMode ? <input
                    type="text"
                    value={editProfile.company}
                    onChange={(event) => handleChange(event, 'company')}
                /> : <Box>{profile.company}</Box>}

                {/* <h2>Contact Info</h2>
                        <div><strong>Email: </strong>{user.email}</div> */}


            </Paper>
            {/* this will be a text box center top */}

            <Paper sx={{
                gap: 2,
                borderRadius: 2,
                border: 1,
                padding: 3,
                display: 'inline-block',
                boxShadow: 10,
                flex: 'auto',
                minWidth: '50vw',
                maxWidth: '50vw'

            }}>

                <h3>About Me</h3>

                <Box>
                    {editMode ? <TextField
                        type="text"
                        value={editProfile.about_me}
                        multiline
                        maxRows= {5}
                        fullWidth
                        onChange={(event) => handleChange(event, 'about_me')}
                    /> : <Box>{profile.about_me}</Box>}
                </Box>
            </Paper>


            <Box>
                <Paper sx={{
                    gap: 2,
                    borderRadius: 2,
                    border: 1,
                    padding: 3,
                    display: 'inline-block',
                    boxShadow: 10,
                    margin: 1,
                    flex: 'auto',
                    minWidth: '15vw',
                    maxWidth: '50vw'


                }}>

                    <h3>Device Information</h3>

                    <Box><strong>Device: </strong> </Box>
                    {editMode ? <input
                        type="text"
                        value={editProfile.device}
                        onChange={(event) => handleChange(event, 'device')}
                    /> : <span>{profile.device}</span>}


                    <Box><strong>Device Settings: </strong> </Box>
                    {editMode ? <input
                        type="text"
                        value={editProfile.device_settings}
                        onChange={(event) => handleChange(event, 'device_settings')}
                    /> : <span>{profile.device_settings}</span>}


                    <Box><strong>Baseline: </strong> </Box>
                    {editMode ? <input
                        type="text"
                        value={editProfile.baseline}
                        onChange={(event) => handleChange(event, 'baseline')}
                    /> : <span>{profile.baseline}</span>}


                    <Box><strong>Improvements: </strong> </Box>
                    {editMode ? <input
                        type="text"
                        value={editProfile.improvements}
                        onChange={(event) => handleChange(event, 'improvements')}
                    /> : <span>{profile.improvements}</span>}

                </Paper>






                <Paper sx={{
                    gap: 2,
                    borderRadius: 2,
                    border: 1,
                    padding: 3,
                    display: 'inline-block',
                    margin: 1,
                    boxShadow: 10,
                    flex: 'auto',
                    minWidth: '15vw',
                    maxWidth: '50vw'




                }}>

                    <h3>Biometrics</h3>


                    <div><strong>Age: </strong></div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.age}
                        onChange={(event) => handleChange(event, 'age')}
                    /> : <span>{profile.age}</span>}



                    <div><strong>Height: </strong>  </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.height}
                        onChange={(event) => handleChange(event, 'height')}
                    /> : <span>{profile.height}</span>}



                    <div><strong>Weight: </strong> </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.weight}
                        onChange={(event) => handleChange(event, 'weight')}
                    /> : <span>{profile.weight}</span>}




                    <div><strong>Biological Gender: </strong> </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.biological_gender}
                        onChange={(event) => handleChange(event, 'biological_gender')}
                    /> : <span>{profile.biological_gender}</span>}



                    <div><strong>Injury Level: </strong>  </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.injury_level}
                        onChange={(event) => handleChange(event, 'injury_level')}
                    /> : <span>{profile.injury_level}</span>}



                    <div><strong>Aisa Level:</strong>  </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.aisa_level}
                        onChange={(event) => handleChange(event, 'aisa_level')}
                    /> : <span>{profile.aisa_level}</span>}


                    <div><strong>Time Since Injury: </strong> </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.time_since_injury}
                        onChange={(event) => handleChange(event, 'time_since_injury')}
                    /> : <span>{profile.time_since_injury}</span>}


                    <div><strong>Medical Condition: </strong> </div>
                    {editMode ? <input
                        type="text"
                        value={editProfile.medical_conditions}
                        onChange={(event) => handleChange(event, 'medical_conditions')}
                    /> : <span>{profile.medical_conditions}</span>}


                </Paper>
            </Box>



            {editMode ?
                <FormControl>
                    <h3>Profile Privacy</h3>
                    <RadioGroup
                        onChange={handlePrivacy}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={editProfile.public}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Visible to Anyone" />
                        <FormControlLabel value={1} control={<Radio />} label="Visible to Users" />
                        <FormControlLabel value={2} control={<Radio />} label="Private" />
                    </RadioGroup>
                </FormControl> : ''}


            {user.id == profileId && <Container>
                <Button variant="contained" sx={{ bgcolor: '#4E9BB9' }} onClick={toPostHistory}>Post History</Button >
                {editMode ? <Button variant="contained" sx={{ bgcolor: '#4E9BB9', margin: 1 }} onClick={handleSubmit}>Submit</Button> : <Button variant="contained" sx={{ bgcolor: '#4E9BB9', margin: 1 }} onClick={handleUpdate}>Update Profile</Button>}
                {editMode ? <Button variant="contained" sx={{ bgcolor: '#4E9BB9' }} onClick={handleDelete}>Delete Profile</Button> : ''}
            </Container>}


        </>
    );
}

export default ProfilePage;





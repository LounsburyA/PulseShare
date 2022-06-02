import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, CardMedia, CardContent } from '@mui/material';
import { Container } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';






function ProfilePage() {
    useEffect(() => {
        dispatch({ type: 'GET_PROFILE', payload: id });
    }, [id]);


    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(store => store.user);
    const profile = useSelector(store => store.profile);
    const editProfile = useSelector(store => store.editProfileReducer);

    const [editMode, setEditMode] = useState(false);

    const handleClick = () => {
        history.push('/postHistory')
    }


    const handleUpdate = () => {
        //switch to edit mode "form"
        console.log('clicked update profile');
        dispatch({
            type: 'SET_PROFILE_T0_EDIT',
            payload: profile
        })
        setEditMode(!editMode);
    }

    const handleSubmit = () => {
        console.log('save clicked');

        dispatch({
            type: 'PUT_PROFILE',
            payload: editProfile
        })
        dispatch({ type: 'CLEAR_EDIT' });
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
    const handlePrivacy = (event) =>{
        let privacy = event.target.value;
        dispatch({
            type: 'EDIT_PRIVACY',
            payload: {property: 'public', value: privacy }
        })
    }



    return (
        <>
            <div>{editMode ?
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Profile Privacy</FormLabel>
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
                {/* this goes on the side bar */}

                <Container >
                    <div>

                        {/* <img src={profile.profile_picture}></img> */}
                        <img src={profile.profile_picture} width={200} height={200}></img>
                        <div><strong>User Name: </strong>{user.username}</div>
                        <div><strong>Pronouns: </strong></div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.pronouns}
                            onChange={(event) => handleChange(event, 'pronouns')}
                        /> : <div>{profile.pronouns}</div>}

                        {/* <div><strong>General Info </strong> </div> */}

                        <strong> Location: </strong>
                        {editMode ? <input
                            type="text"
                            value={editProfile.location}
                            onChange={(event) => handleChange(event, 'location')}
                        /> : <div>{profile.location}</div>}

                        <strong>Job Title: </strong>
                        {editMode ? <input
                            type="text"
                            value={editProfile.job_title}
                            onChange={(event) => handleChange(event, 'job_title')}
                        /> : <div>{profile.job_title}</div>}

                        <strong>Company: </strong>

                        {editMode ? <input
                            type="text"
                            value={editProfile.company}
                            onChange={(event) => handleChange(event, 'company')}
                        /> : <div>{profile.company}</div>}

                        {/* <h2>Contact Info</h2>
                        <div><strong>Email: </strong>{user.email}</div> */}


                    </div>
                </Container>

                {/* this will be a text box center top */}
                <Container >
                    <div>

                        <h2>About Me</h2>

                        <div>
                            {editMode ? <input
                                type="text"
                                value={editProfile.about_me}
                                onChange={(event) => handleChange(event, 'about_me')}
                            /> : <div>{profile.about_me}</div>}
                        </div>
                    </div>
                </Container>

                <Container >
                    <div >

                        <h2>Device Information</h2>

                        <div><strong>Device: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.device}
                            onChange={(event) => handleChange(event, 'device')}
                        /> : <div>{profile.device}</div>}


                        <div><strong>Device Settings: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.device_settings}
                            onChange={(event) => handleChange(event, 'device_settings')}
                        /> : <div>{profile.device_settings}</div>}


                        <div><strong>Baseline: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.baseline}
                            onChange={(event) => handleChange(event, 'baseline')}
                        /> : <div>{profile.baseline}</div>}


                        <div><strong>Improvements: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.improvements}
                            onChange={(event) => handleChange(event, 'improvements')}
                        /> : <div>{profile.improvements}</div>}

                    </div>
                </Container>




                <Container >
                    <div>

                        <h2>Biometrics</h2>
                        <div><strong>Age: </strong></div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.age}
                            onChange={(event) => handleChange(event, 'age')}
                        /> : <div>{profile.age}</div>}



                        <div><strong>Height: </strong>  </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.height}
                            onChange={(event) => handleChange(event, 'height')}
                        /> : <div>{profile.height}</div>}



                        <div><strong>Weight: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.weight}
                            onChange={(event) => handleChange(event, 'weight')}
                        /> : <div>{profile.weight}</div>}




                        <div><strong>Biological Gender: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.biological_gender}
                            onChange={(event) => handleChange(event, 'biological_gender')}
                        /> : <div>{profile.biological_gender}</div>}



                        <div><strong>Injury Level: </strong>  </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.injury_level}
                            onChange={(event) => handleChange(event, 'injury_level')}
                        /> : <div>{profile.injury_level}</div>}



                        <div><strong>Aisa Level:</strong>  </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.aisa_level}
                            onChange={(event) => handleChange(event, 'aisa_level')}
                        /> : <div>{profile.aisa_level}</div>}


                        <div><strong>Time Since Injury: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.time_since_injury}
                            onChange={(event) => handleChange(event, 'time_since_injury')}
                        /> : <div>{profile.time_since_injury}</div>}


                        <div><strong>Medical Condition: </strong> </div>
                        {editMode ? <input
                            type="text"
                            value={editProfile.medical_conditions}
                            onChange={(event) => handleChange(event, 'medical_conditions')}
                        /> : <div>{profile.medical_conditions}</div>}


                    </div>
                </Container>


                <div>
                    <button onClick={handleClick}>Post History</button>
                    {editMode ? <button onClick={handleSubmit}>Submit</button> : <button onClick={handleUpdate}>Update Profile</button>}
                </div>

            </div>
        </>
    );
}

export default ProfilePage;




    // x const [pronouns, setPronouns] = useState('');
    // x const [device, setDevice] = useState('')
    // x  const [deviceSettings, setDeviceSettings] = useState('')
    // x const [injuryLevel, setInjuryLevel] = useState('')
    // x const [aisaLevel, setAisaLevel] = useState('')
    // x const [timeSinceInjury, setTimeSinceInjury] = useState('')
    // x const [baseline, setBaseline] = useState('')
    // x const [improvements, setImprovements] = useState('')

    // const [location, setLocation] = useState('')
    // const [jobTitle, setJobTitle] = useState('')
    // const [company, setCompany] = useState('')


    // x const [aboutMe , setAboutMe] = useState('')
    // const [public, setPublic] = useState('')
    // x const [biologicalGender, setBiologicalGender] = useState('')
    // x const [age, setAge] = useState('')
    // x const [height, setHeight] = useState('')
    // x const [weight, setWeight] = useState('')
    // x const [medicalCondition, setMedicalCondtion] = useState('')

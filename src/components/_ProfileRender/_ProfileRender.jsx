
import ProfilePage from '../_ProfilePage/ProfilePage';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';




const profileRender = () => {
    useEffect(() => {
        dispatch({ type: 'GET_PROFILE', payload: id });
    }, [id]);


    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const profile = useSelector(store => store.profile);
    const editProfile = useSelector(store => store.editProfileReducer);


    // if im logged in, and im looking at my profile, and my profile is private, i should still see it
    // if im logged in, and im looking at a different profile, and it is private, i should NOT see it
    //if im logged in, and im looking at a different profile, and its visible, i should see it
    // can move this into it's own component and return the profile page to render
    //<ProfilePage/ >
    return (
        <>
            {(profile.public === 2 && user.id == profile.user_id) && <ProfilePage profileId={id}/>}
            {(profile.public === 2 && user.id != profile.user_id) && <p>profile is private</p>}


            {(profile.public === 1 && user.id) && <ProfilePage profileId={id}/>}


            {(profile.public === 0) && <ProfilePage profileId={id}/> }
        </>
    )
}

export default profileRender;
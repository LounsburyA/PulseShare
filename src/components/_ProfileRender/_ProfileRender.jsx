
import ProfilePage from '../_ProfilePage/ProfilePage';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';




const profileRender = () => {
    useEffect(() => {
        dispatch({type: 'CLEAR_PROFILE'})
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
    // before return add if blockthat decides what returns....


    // {(profile.public === 2 && user.id == profile.user_id) && <ProfilePage profileId={id}/>}
    // {(profile.public === 2 && user.id != profile.user_id) && <p>profile is private</p>}
    // {(profile.public === 1 && user.id) && <ProfilePage profileId={id}/>}
    // {(profile.public === 0) && <ProfilePage profileId={id}/> }

    const viewProfile = () => {

        if (profile.public === 2 && user.id == profile.user_id) {
            return <ProfilePage profileId={id} />

        } else if (profile.public === 1 && user.id) {
            return <ProfilePage profileId={id} />
        } else if (profile.public === 0) {
            return <ProfilePage profileId={id} />
        } else {
            return <h1>This profile is private</h1>
        }


    }
    return (
        <>

            {viewProfile()}
        </>
    )
}


//else if (profile.public === 2 && user.id != profile.user_id) {
// return (<p>This profile is private</p>)
//}
export default profileRender;
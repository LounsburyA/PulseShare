import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const handleClick = () => {
        history.push('/postHistory')
    }

    return (
        <div>
            <h2>Profile Page goes here</h2>
            <p>{user.username}</p>
            <button onClick={handleClick}>Post History</button>
        </div>
    );
}

export default ProfilePage;
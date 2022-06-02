import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function AddPostPage() {
    const user = useSelector(store => store.user);

    return (
        <div>
            <h2>Add Post Page goes here</h2>
        </div>
    );
}

export default AddPostPage;
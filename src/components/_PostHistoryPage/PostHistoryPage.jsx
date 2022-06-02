import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

function PostHistoryPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    return (
        <div>
            <h2>Post History goes here</h2>
        </div>
    );
}

export default PostHistoryPage;
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostDetailPage from '../_PostDetailPage/PostDetailPage';

function PostListPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const handleClick = () => {
        history.push('/addPost')
    }

    return (
        <div>
            <h2>This page was replaced by ForumPage</h2>
            <button onClick={handleClick}>Add Post</button>
        </div>
    );
}

export default PostListPage;
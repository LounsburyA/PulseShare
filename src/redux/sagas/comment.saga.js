import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addComment(action) {
    //add comment to DB
    try{
        console.log('Payload in addComment:', action.payload);
        const comment = yield axios.post('/comment', action.payload)
        console.log('added comment:', comment.data)
    } catch (error) {
        console.log('addComment error:', error)
    }
}

function* getComments(action) {
    //get comment from DB
    try{
        const comments = yield axios.get(`/comment/${action.payload}`);
        yield put({ type: 'SET_COMMENTS', payload: comments.data });
        console.log('GET Comments:', comments.data)
    } catch (error) {
        console.log('GET Comments error:', error)
    }
}

function* commentSaga() {
    yield takeLatest('CREATE_NEW_COMMENT', addComment);
    yield takeLatest('GET_COMMENTS', getComments);
}

export default commentSaga;
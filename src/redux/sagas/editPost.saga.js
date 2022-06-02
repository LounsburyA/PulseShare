import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Get the details for the post to edit
function* getEditPost(action) {
    try {
        const editDetails = yield axios.get(`/post/${action.payload}`)
        yield put({ type: 'SET_POST_TO_EDIT', payload: editDetails.data[0] })
    } catch (err) {
        console.log(err);
    }
}

// Submit the edited information to the server and database
function* updatePost(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/post/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_POST', payload: action.payload.id });
        yield put({type: 'CLEAR_IMAGE'});
        yield put({type: 'CLEAR_VIDEO'});
    } catch (err) {
        console.log(err);
    }
}


function* editSaga() {
    yield takeLatest('GET_POST_TO_EDIT', getEditPost)
    yield takeLatest('UPDATE_POST', updatePost);
}

export default editSaga;
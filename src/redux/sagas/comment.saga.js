import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addComment(action) {
    //add comment to DB
    try{
        const comment = yield axios.post('/comment', action.payload);
        yield put({type: 'GET_COMMENTS', payload: action.payload.post_id});
        console.log('Payload in addComment:', action.payload);
        console.log('added comment:', comment.data);
    } catch (error) {
        console.log('POST Comment error:', error)
    }
}

function* getComments(action) {
    //get comment from DB
    try{
        const comments = yield axios.get(`/comment/${action.payload}`);
        yield put({ type: 'SET_COMMENTS', payload: comments.data });
        console.log('GET Comments SAGA:', comments.data);
    } catch (error) {
        console.log('GET Comments error:', error)
    }
}

function* editComment(action) {
    //Edit selected comment based on id
    try{
        yield axios.put(`/comment/${action.payload.id}`, action.payload);
        yield put({type: 'GET_COMMENTS', payload: action.payload.post_id});
        yield put({type: 'CLEAR_EDIT'});
        yield action.callback;
        console.log('EDIT Comment SAGA:', action.payload);
    }catch (error) {
        console.log('EDIT Comments error:', error);
        
    }
    
}

// Delete selected comment based on id
function* deleteComment(action) {
    try {
        yield axios.delete(`/comment/${action.payload.id}`);
        yield put({type: 'GET_COMMENTS', payload: action.payload.post_id});
        console.log('DELETE Comment SAGA:', action.payload);
    } catch (error) {
        console.log('DELETE Comments error:', error);
    }
}

function* commentSaga() {
    yield takeLatest('CREATE_NEW_COMMENT', addComment);
    yield takeLatest('GET_COMMENTS', getComments);
    yield takeLatest('DELETE_COMMENT', deleteComment);
    yield takeLatest('PUT_COMMENT', editComment);
}

export default commentSaga;
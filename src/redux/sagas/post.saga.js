import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// saga getOutcomesList will get the list of outcomes from DB
function* getOutcomesList() {
    try {
        const outcomesList = yield axios.get('/post/outcomesList');

        yield put({ type: 'SET_OUTCOMES_LIST', payload: outcomesList.data });
    } catch (error) {
        console.log('Outcomes List GET request failed', error);
    }
}

// saga getOutcomesList will get the list of outcomes from DB
function* getAllPosts() {
    try {
        const postList = yield axios.get('/post/postList');

        yield put({ type: 'SET_POST_LIST', payload: postList.data });
    } catch (error) {
        console.log('Post List GET request failed', error);
    }
}

// saga getPostByOutcome will get the list of posts using outcome_id from DB
function* getPostByOutcome(action) {
    try {
        const postList = yield axios.get(`/post/postListByOutcome/${action.payload}`);

        yield put({ type: 'SET_POST_LIST', payload: postList.data });
    } catch (error) {
        console.log('Post List by outcome_id GET request failed', error);
    }
}

// saga createNewPost will insert new post to DB
function* createNewPost(action) {
    try {
        const postId = yield axios.post('/post', action.payload);
        yield put({type: 'GET_POST', payload: postId.data[0].id});
        yield action.payload.history.push(`/postDetail/${postId.data[0].id}`)

        yield put({type: 'CLEAR_IMAGE'})
        yield put({type: 'CLEAR_VIDEO'})
    } catch (error) {
        console.log('Create new post request failed', error);
    }
}

//get details for single post
function* getPostDetails(action) {
    try {
        console.log('GETTING POST DETAILS', action.payload);
        const details = yield axios.get(`/post/${action.payload}`);
        yield put({ type: 'SET_POST', payload: details.data[0] });
    } catch (err) {
        console.log(err);
    }
}

// get user's previous posts
function* getPostHistory() {
    console.log('in getPostHistory');
    try {
        const postHistory = yield axios.get(`/history`);
        yield put({ type: 'SET_POST_HISTORY', payload: postHistory.data });
    } catch (err) {
        console.log(`ERROR GETTING POST HISTORY`);
    }
}
// Delete selected post
function* deletePost(action) {
    try {
        console.log('IN DELETE SAGA');
        yield axios.delete(`/post/${action.payload}`)
        yield put({type: 'GET_ALL_POSTS'})
        yield put({type: 'GET_POST_HISTORY'})
    } catch (err) {
        console.log(err);
    }
}

// Update post with new information
function* updatePost(action) {
    try  {
        yield axios.put(`/post/${action.payload.id}`)
        yield put({type: 'GET_POST', payload: action.payload.id})
    } catch (err) {
        console.log(err);
    }
}

function* postSaga() {
    yield takeLatest('GET_POST', getPostDetails);
    yield takeLatest('GET_ALL_POSTS', getAllPosts);
    yield takeLatest('GET_POSTS_BY_OUTCOME', getPostByOutcome);
    yield takeLatest('DELETE_POST', deletePost)
    yield takeLatest('GET_OUTCOMES_LIST', getOutcomesList);
    yield takeLatest('CREATE_NEW_POST', createNewPost);
    yield takeLatest('GET_POST_HISTORY', getPostHistory);

}

export default postSaga;
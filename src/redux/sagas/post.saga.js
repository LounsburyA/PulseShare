import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// saga getOutcomesList will get the list of outcomes from DB
function* getOutcomesList() {
    try {
        const outcomesList = yield axios.get('/api/post/outcomesList');
        yield put({ type: 'SET_OUTCOMES_LIST', payload: outcomesList.data });
    } catch (error) {
        console.log('Outcomes List GET request failed', error);
    }
}

// saga getAllPosts will get the list of posts from DB
function* getAllPosts() {
    try {
        const postList = yield axios.get('/api/post/postList');
        yield put({ type: 'SET_POST_LIST', payload: postList.data });
    } catch (error) {
        console.log('Post List GET request failed', error);
    }
}

// saga getPostByOutcome will get the list of posts using outcome_id from DB
function* getPostByOutcome(action) {
    try {
        const postList = yield axios.get(`/api/post/postListByOutcome/${action.payload}`);
        yield put({ type: 'SET_POST_LIST', payload: postList.data });
    } catch (error) {
        console.log('Post List by outcome_id GET request failed', error);
    }
}

// saga createNewPost will insert new post to DB
function* createNewPost(action) {
    try {
        const postId = yield axios.post('/api/post', action.payload);
        yield put({ type: 'GET_POST', payload: postId.data[0].id });
        yield action.payload.history.push(`/postDetail/${postId.data[0].id}`)
        yield put({ type: 'CLEAR_IMAGE' })
        yield put({ type: 'CLEAR_VIDEO' })
    } catch (error) {
        console.log('Create new post request failed', error);
    }
}

// get details for single post
function* getPostDetails(action) {
    try {
        const details = yield axios.get(`/api/post/${action.payload}`);
        yield put({ type: 'SET_POST', payload: details.data[0] });
    } catch (err) {
        console.log(err);
    }
}

// get user's previous posts
function* getPostHistory() {
    try {
        const postHistory = yield axios.get(`/api/history`);
        yield put({ type: 'SET_POST_HISTORY', payload: postHistory.data });
    } catch (err) {
        console.log(`ERROR GETTING POST HISTORY`);
    }
}
// Delete selected post
function* deletePost(action) {
    try {
        yield axios.delete(`/post/${action.payload}`)
        yield put({ type: 'GET_ALL_POSTS' })
        yield put({ type: 'GET_POST_HISTORY' })
    } catch (err) {
        console.log(err);
    }
}


// Get the details for the post to edit
function* getEditPost(action) {
    try {
        const editDetails = yield axios.get(`/api/post/${action.payload}`)
        yield put({ type: 'SET_POST_TO_EDIT', payload: editDetails.data[0] })
    } catch (err) {
        console.log(err);
    }
}

// Submit the edited information to the server and database
function* updatePost(action) {
    try {
        yield axios.put(`/api/post/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_POST', payload: action.payload.id });
        yield put({ type: 'CLEAR_POST_EDIT' })
        yield put({ type: 'CLEAR_IMAGE' });
        yield put({ type: 'CLEAR_VIDEO' });
        yield action.callback;
    } catch (err) {
        console.log(err);
    }
}

// Get filtered information from database based on title text, body text, or tag
function* keywordSearch(action) {
    const keyword = action.payload;
    try {
        const keywordSearch = yield axios.get(`/api/keyword/${keyword}`)
        yield put({ type: 'SET_KEYWORD_POSTS', payload: keywordSearch.data })
    } catch {
        console.log('ERROR PERFORMING KEYWORD SEARCH IN SAGA');
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
    yield takeLatest('GET_POST_TO_EDIT', getEditPost)
    yield takeLatest('UPDATE_POST', updatePost);
    yield takeLatest('SEARCH_BY_KEYWORD', keywordSearch);
}

export default postSaga;
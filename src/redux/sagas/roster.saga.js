import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* rosterSaga() {
    yield takeLatest('GET_ROSTER', getRoster);
    yield takeLatest('PROMOTE_USER', promoteUser);
    yield takeLatest('DEMOTE_USER', demoteUser);
    yield takeLatest('DELETE_USER', deleteUser);
    yield takeLatest('SEARCH_FOR_USER', searchForUser);
}

// get all of the users to be displayed in the user table for the Admin
function* getRoster(action) {
    try {
        const roster = yield axios.get('/api/roster')
        yield put({ type: 'SET_ROSTER', payload: roster.data })
    } catch {
        console.log('ERROR GETTING ROSTER');

    }

}

// will give the user tied to the id in the payload moderator privileges by changing their access level to 1
function* promoteUser(action) {
    try {
        yield axios.put('/api/roster/promote', action.payload)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR PROMOTING USER');

    }

}

// the user tied to the id in the payload will have their moderator privileges revoked by changing their access level to 0
function* demoteUser(action) {
    try {
        yield axios.put('/api/roster/demote', action.payload)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR DEMOTING USER');

    }
}

// the user tied to the id in the payload will have their account deleted
function* deleteUser(action) {
    const id = action.payload.id

    try {
        yield axios.delete(`api/roster/${id}`)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR DELETING USER');

    }
}

// searches for a specific user from the table by sending the contents of the search input as a search query
function* searchForUser(action) {
    const user = action.payload.userName;

    try {
        const searches = yield axios.get(`/api/search/${user}`, action.payload)
        yield put({ type: 'SET_SEARCHED_USER', payload: searches.data })
    } catch {
        console.log('ERROR SEARCHING FOR A USER');

    }

}

export default rosterSaga;
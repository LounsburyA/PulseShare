import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* rosterSaga() {
    yield takeLatest('GET_ROSTER', getRoster);
    yield takeLatest('PROMOTE_USER', promoteUser);
    yield takeLatest('DEMOTE_USER', demoteUser);
    yield takeLatest('DELETE_USER', deleteUser);
    yield takeLatest('SEARCH_FOR_USER', searchForUser);
}

function* getRoster(action) {
    console.log('in getRoster');
    try {
        const roster = yield axios.get('/api/roster')
        yield put({ type: 'SET_ROSTER', payload: roster.data })
    } catch {
        console.log('ERROR GETTING ROSTER');

    }

}

function* promoteUser(action) {
    console.log('in promoteUser');
    console.log(action.payload);
    try {
        yield axios.put('api/roster/promote', action.payload)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR PROMOTING USER');

    }

}

function* demoteUser(action) {
    console.log('in demoteUser');
    console.log(action.payload);
    try {
        yield axios.put('api/roster/demote', action.payload)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR DEMOTING USER');

    }
}

function* deleteUser(action) {
    console.log('in deleteUser');
    const id = action.payload.id

    try {
        yield axios.delete(`api/roster/${id}`)
        yield put({ type: 'GET_ROSTER' })
    } catch {
        console.log('ERROR DELETING USER');

    }
}

function* searchForUser(action) {
    const user = action.payload.userName;
    console.log(user);
    
    try {
        const searches = yield axios.get(`/search/${user}`, action.payload)
        yield put({ type: 'SET_SEARCHED_USER', payload: searches.data })
    } catch {
        console.log('ERROR SEARCHING FOR A USER');

    }

}

export default rosterSaga;
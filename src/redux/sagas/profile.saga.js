import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Get the information for the selected profile
function* getProfile(action) {
    try {
        const response = yield axios.get(`/api/profile/${action.payload}`);
        yield put({ type: 'SET_PROFILE', payload: response.data[0] });
    }
    catch (error) {
        console.log('PROFILE SAGA failure', error);
    }
}

// deletes users entire account
function* deleteProfile(action) {
    const id = action.payload;
    try {
        yield axios.delete(`/api/profile`)
        yield put({ type: 'LOGOUT' })
        yield action.payload.push("/home")
    } catch (error) {
        console.log('error in delete profile catch', error);
    }
}

function* profileSaga() {
    yield takeEvery('GET_PROFILE', getProfile)
    yield takeEvery('DELETE_PROFILE', deleteProfile)
}


export default profileSaga;
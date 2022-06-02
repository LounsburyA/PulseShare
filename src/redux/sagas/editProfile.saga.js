import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects';

// Get the profile information to edit
function* getEditProfile(action) {
    try {
        const response = yield axios.get(`/api/profile/${action.payload}`);
        yield put({ type: 'SET_PROFILE_TO_EDIT', payload: response.data[0] });
    }
    catch (error) {
        console.log(' GET in edit saga is failing', error);
    }
}

// Send updated profile information to DB
function* updateProfile(action) {
    try {
        yield axios.put(`/profile/${action.payload.id}`, action.payload)
        yield put({ type: 'GET_PROFILE', payload: action.payload.user_id })
    } catch (error) {
        console.log(error);

    }

}

function* editProfileSaga() {
    yield takeEvery('GET_PROFILE', getEditProfile)
    yield takeEvery('PUT_PROFILE', updateProfile)
    // yield takeEvery('SUBMIT_IMAGE', submitImage)

}
export default editProfileSaga;
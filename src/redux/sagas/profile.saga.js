import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getProfile(action) {
    try {
        const response = yield axios.get(`/profile/${action.payload}`);
        yield put({ type: 'SET_PROFILE',payload: response.data[0] });
    }
    catch (error) {
        console.log('PROFILE SAGA failure', error);

    }
}
function* profileSaga() {
    yield takeEvery('GET_PROFILE', getProfile)

}
export default profileSaga;
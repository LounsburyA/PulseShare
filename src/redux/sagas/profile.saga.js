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

// deletes users entire profile

function* deleteProfile(action) {
    const id = action.payload;
    console.log('delete profile saga id:', id);
    try {
        yield axios.delete(`/profile`)
        yield put ({type: 'LOGOUT'})
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
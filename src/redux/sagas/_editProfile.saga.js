import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects';


function* getEditProfile(action) {
    try {
        const response = yield axios.get(`/profile/${action.payload}`);
        yield put({ type: 'SET_PROFILE_TO_EDIT', payload: response.data[0] });
    }
    catch (error) {
        console.log(' GET in edit saga is failing', error);
    }
}

// function* submitImage(action) {

//     try{
//         yield put({
//             type: 'EDIT_ON_CHANGE',
//             payload: {
//                 property: action.payload.property,
//                 value: action.payload.value
//             }
//         });
//         yield put({
//             type: 'PUT_PROFILE',
//             payload: editProfile
//         });
//         yield put({ type: 'CLEAR_EDIT' });
//     }catch (error) {
//         console.log(error);
        
//     }
    
// }

function* updateProfile(action) {
    try{
        console.log('update profile action.payload', action.payload);
        yield axios.put(`/profile/${action.payload.id}`, action.payload)
        yield put({type: 'GET_PROFILE', payload: action.payload.user_id})
    }catch (error) {
        console.log(error);
        
    }
    
}

function* editProfileSaga() {
    yield takeEvery ('GET_PROFILE', getEditProfile)
    yield takeEvery('PUT_PROFILE', updateProfile)
    // yield takeEvery('SUBMIT_IMAGE', submitImage)

}
export default editProfileSaga;
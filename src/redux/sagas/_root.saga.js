import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import postSaga from './post.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import commentSaga from './comment.saga';
import profileSaga from './profile.saga';
import editProfileSaga from './_editProfile.saga';
import rosterSaga from './roster.saga';
import editPost from './editPost.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    commentSaga(),
    profileSaga(),
    editProfileSaga(),
    rosterSaga(),
    postSaga(),
    editPost(),
  ]);
}

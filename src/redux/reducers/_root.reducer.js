import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import profile from './profile.reducer'
import editProfileReducer from './_editProfile.reducer';
import rosterReducer from './roster.reducer';
import imageReducer from './image.reducer';
import outcomesListReducer from './outcomesList.reducer';
import videoReducer from './video.reducer';
import post from './post.reducer';
import editPostReducer from './editPost.reducer';
import postHistoryReducer from './postHistory.reducer';
import postListReducer from './postList.reducer';
import comment from './comment.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  profile, // contains profile information
  editProfileReducer,
  rosterReducer,
  imageReducer,
  videoReducer,
  outcomesListReducer,
  post,
  editPostReducer,
  postHistoryReducer,
  postListReducer,
  comment,
});

export default rootReducer;

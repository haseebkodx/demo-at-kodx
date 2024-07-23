import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../components/auth.reducer';
import loadingReducer from '../components/loading.reducer';
import periodOfPerormanceReducer from '../components/mentor/mentorAgreement/periodOfPerformance.reducer';
import updatedUserReducer from '../components/user/UserProfile.reducer';
import currentUserReducer from '../components/currentUser.reducer';
import acceptedReducer from '../components/mentor/mentorDashboard/approveDecline.reducer';
import reviewerPage from '../components/reviewer/ReviewerPage.reducer'

const reducers = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
  auth: authReducer,
  loading: loadingReducer,
  errorPOP: periodOfPerormanceReducer,
  updatedUser: updatedUserReducer,
  currentUserInfo: currentUserReducer,
  acceptDecline: acceptedReducer,
  reviewerPage: reviewerPage
});

export default reducers;

import authReducer from './authReducer';
import roomReducer from './roomReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import dateReducer from './dateSlice';
import userTypeReducer from './userTypeSlice';
import bookingReducer from './bookingSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    room: roomReducer,
    date: dateReducer,
    userType: userTypeReducer,
    booking: bookingReducer,
    firestore: firestoreReducer, //link to  firestore for adding data to a collection
    firebase: firebaseReducer //link to firebase for authentication
});
export default rootReducer;
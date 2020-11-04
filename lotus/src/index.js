import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,

} from "redux-firestore";
import { reactReduxFirebase, ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./config/firebaseConfig";
import firebase from "firebase/app";

//for render on auth ready
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

//applymiddleware returns a store enhancer
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, firebaseConfig),
    // reactReduxFirebase(firebaseConfig, {useFirestoreForProfile:true, userProfile: 'users', attachAuthIsReady:true})
  )
);

const profileSpecificProps = {
  userProfile: 'user',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
};


const rrfProps = {
  firebase,
  // config: firebaseConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div className="center"><p>Loading..</p></div>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <React.StrictMode>
        <App />
      </React.StrictMode>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

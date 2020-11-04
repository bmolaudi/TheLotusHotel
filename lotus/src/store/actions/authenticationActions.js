export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESSFUL' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESSFUL' }); //this action is handled in authReducer
        })
    }
}
export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('user').doc(response.user.uid).set({
                //set input to data fields in database
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                userType: "guest",
                initials: newUser.firstname[0] + newUser.lastname[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESSFUL' }); //these are handled inside the reducer
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err });
        })
    };
}
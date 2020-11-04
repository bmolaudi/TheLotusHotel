export const createRoom = (room) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        //const imageUrl = getState();//
        firestore.collection('rooms').add({ //this adds the data to firestore
            ...room,

            fname: 'first name',
            lname: 'last name'
        }).then(() => {
            dispatch({ type: 'CREATE_ROOM', room: room });//we are creating the room "room: room"
        }).catch((err) => {
            dispatch({ type: 'CREATE_ROOM_ERROR', err });
        })
        
        
    }
};
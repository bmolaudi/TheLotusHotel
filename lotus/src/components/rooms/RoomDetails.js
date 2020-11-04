import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from 'react-router-dom';

const RoomDetails = (props) => {
  const { room, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />
  if (room) {
    return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
          <span className="card-title">{room.title}</span>
          <p>{room.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        </div>
        
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading Room</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const rooms = state.firestore.data.rooms;
  const room = rooms ? rooms[id] : null;
  return {
    room: room,
    auth: state.firebase.auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "rooms" }])
)(RoomDetails);

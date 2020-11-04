import React, { Component } from 'react';
import Notifications from './Notifications';
import RoomList from '../rooms/RoomList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
//import { Redirect } from 'react-router-dom';

class Dashboard extends Component{
  render() {
    //console.log(this.props)
    const { rooms, auth } = this.props;
    //if (!auth.uid) return <Redirect to=" /signin" />

    return (
      <div className="container section">
        <div className="row">
          <div className="col s12 m6">
            <RoomList rooms={rooms}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
    }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    rooms: state.firestore.ordered.rooms,
    auth: state.firebase.auth
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'rooms'}
  ]))
  (Dashboard);
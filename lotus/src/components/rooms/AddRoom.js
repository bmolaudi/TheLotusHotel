import React, { Component } from "react";
import { connect } from 'react-redux';
import { createRoom } from '../../store/actions/roomActions';
import { Redirect } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import "firebase/firestore";



//creates a new room 
class AddRoom extends Component {
  state = {
    title: "", 
    description: "",
    image: ""
  };

  handleChange = async (e) => {
    
    const event = e.target;
    const storageRef = firebase.storage().ref();
    
    if (event.id) {
      this.setState({
      [event.id]: event.value,
      });
    }
    else {
      const file = event.files[0];
      const url = "";
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file).then( async () => {
        url = await fileRef.getDownloadURL().then(() => {
          this.setState({
            image: url
          })
        })
      });
    }
    console.log("HandleChange done")
  };
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(handleImageUpload(this.state));
    this.props.createRoom(this.state);
    
    console.log(this.state.title);
    console.log(this.state.description);
    console.log(this.state.image);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add New Room</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="description">Room Description</label>
            <textarea
              type="text"
              id="description"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="input">
            <input type="file" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <button className="btn red lighten-2 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

//not used
const handleImageUpload = (state) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(state.image.name);
  fileRef.put(state.image).then(() => {
    return {
        ...state,
        downloadUrl: fileRef.getDownloadURL(),
      };
  })

  
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => dispatch(createRoom(room))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);

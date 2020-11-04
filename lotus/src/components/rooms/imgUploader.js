import React, { Component } from 'react';
import firebase from 'firebase/app';

class Uploader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "",
            uploadError: ""
        };
    }
    handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                image: file,
                uploadError: ""
            });
            console.log(file.name);
            console.log("Successful image upload");
        } else {
            this.setState({
                uploadError: "Please select an image tp upload"
            })
        }
    }
    handleUpload = () => {
        const file  = this.state.image[0];
        if (file) {
            const storageRef = firebase.storage().ref("images/" + file.name);
            const uploadtTask = storageRef.put(file);
            uploadtTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                    const downloadURL = uploadtTask.snapshot.downloadURL;
                    this.setState({ url: downloadURL });
                    console.log(this.state.url);
            })
        } else {
            this.setState({
                uploadError: "select an image to upload"
            });
        }
    }
    render() {
        return (
          <div className="container center">
            <div>
              <input type="file" onChange={this.handleChange} />
              <button className="btn red lighten-2 z-depth-0" onClick={this.handleUpload}>
                Upload
              </button>
            </div>

            <div className="red-text center">{this.state.uploadError}</div>
          </div>
        );
    }
    
}
export default Uploader;
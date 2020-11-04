import React, { Component } from 'react';
import { storage, firestore } from '../../config/firebaseConfig';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddRoom extends Component {
    state = {
        imageURL: "",
        title: "",
        guest: "",
        loading: false,
        error: false,
        roomNumber: "",
        price: "",
    }

    handleOnImageChange = (event) => {
        this.setState({ imageURL: event.target.files[0] })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: false })

    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true, error: false })
        const { imageURL } = this.state;
        const { title, guest, roomNumber, price, } = this.state;
        if (imageURL === '' || title === '' || guest === ''  || roomNumber === ''|| price === '') {
            this.setState({ loading: false, error: true })
        } else {
            const uploadTask = storage.ref(`images/${imageURL.name}`).put(imageURL);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                },
                (error) => {
                    // error function ....
                    this.setState({ loading: false })
                },
                () => {
                    // complete function ....
                    storage.ref('images').child(imageURL.name).getDownloadURL().then(downloadURL => {
                        const addedRoom = {
                            roomImage: downloadURL,
                            title,
                            guest,
                            roomNumber: '',
                            price,
                        }
                        firestore.collection("rooms").doc().set({
                            addedRoom
                        }).then((doc) => {
                            document.getElementById("upload-iten").reset();
                            this.props.handleOnSubmit(addedRoom)
                            this.setState({
                                loading: false, error: false, RoomImage: '',
                                title: '',
                                guest: '',
                                roomNumber: '',
                                price: '',
                            });

                        }).catch((error) => {
                            this.setState({ loading: true })
                            console.error(error);
                        });
                    })
                });
        }
    }

    render() {
        const { title, guest, price, roomNumber,loading, error } = this.state;
        return (
            <div className="modal-dialog modal-dialog-scrollable" data-backdrop="static" tabIndex="9999" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="exampleModalScrollableTitle">Room Upload Panel</h5>
                    </div>
                    <div className="modal-body">
                        <form id="upload-item">
                            <div className="form-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        name="imageURL"
                                        onChange={this.handleOnImageChange} />
                                    <label className="custom-file-label">Choose file</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleOnChange} value={title} className="form-control" name="title" placeholder="title">
                            
                                </input>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleOnChange} value={guest} className="form-control" name="guest" placeholder="number of guest">
                                    
                                </input>
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={roomNumber}
                                    onChange={this.handleOnChange}
                                    placeholder="Room number"
                                    name="roomNumber" />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={price}
                                    onChange={this.handleOnChange}
                                    placeholder="Price per night"
                                    name="price" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button disabled={loading} type="button" className="btn btn-secondary btn-block" data-dismiss="modal"><i className="fas fa-times"></i></button>
                        <button disabled={loading} onClick={this.handleOnSubmit} type="button" className="btn btn-primary btn-block">
                            {loading ? <CircularProgress size={24} color="secondary" /> : <div>Upload Item</div>}
                        </button>
                    </div>
                    <div className="error-message">
                        {error && <div className="text-center">Fill in all the fields</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRoom;
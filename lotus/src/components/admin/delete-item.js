import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { firestore } from '../../config/firebaseConfig';

class DeleteItem extends Component {
    state = {
        modalShow: false,
        onSuccessModal: false
    }

    onShow = () => {
        this.setState({ modalShow: true })
    }

    onHide = () => {
        this.setState({ modalShow: false, onSuccessModal: false })
    }

    onDelete = (deletedCar) => {
        firestore
            .collection("rooms")
            .doc(deletedCar.postId)
            .delete()
            .then(() => {
                this.setState({ modalShow: false })
                this.props.onDelete(deletedCar);
                this.setState({ onSuccessModal: true })
            })
            .catch((error) => {
                this.setState({ modalShow: false })
            })
    }

    onSuccessOK = () => {
        this.setState({ onSuccessModal: false })
    }
    render() {
        const { modalShow, onSuccessModal } = this.state;
        const { brand, model } = this.props.post;
        return (
            <div>
                <button type="button" onClick={this.onShow} className="btn btn-danger btn-block">Delete</button>
                <Modal size="sm" centered show={modalShow} onHide={this.onHide}>
                    <Modal.Body>
                        <h6 className="text-center text-capitalize">Are you sure you want to delete {brand} {model} ?</h6>
                        <div>
                            <button type="button" onClick={() => this.onDelete(this.props.post)} className="btn btn-danger btn-block">Delete</button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="sm" centered show={onSuccessModal} onHide={this.onHide}>
                    <Modal.Body>
                        <h6 className="text-center text-capitalize">Successfully deleted {brand} {model}.....</h6>
                        <div>
                            <button type="button" onClick={this.onSuccessOK} className="btn btn-success btn-block">Okay</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default DeleteItem;
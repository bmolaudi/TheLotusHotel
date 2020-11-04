import React, { Component } from 'react';
import {  firestore } from '../../config/firebaseConfig';
import DeleteItem from './delete-item';
import './admin.css';
import Typography from '@material-ui/core/Typography';

class ViewItem extends Component {
    state = {
        rooms: []
    }

    componentWillReceiveProps = (nextProps) => {
        let rooms = [...this.state.rooms, nextProps.newRoom];
        this.setState({ rooms: rooms })
    }

    onDelete = (index) => {
        this.setState({
            rooms: this.state.rooms.filter((_, i) => i !== index)
        });
    }

    componentDidMount = async () => {
        const rooms = await firestore.collection("rooms").get();
        const array = [];

        rooms.forEach(room => {
                const newRoomId = room.data().addedRoom;
                newRoomId.postId = room.id;
                array.push(newRoomId)
        });
        this.setState({ rooms: array })
    }

    render() {
        const { rooms } = this.state;
        if (!rooms) {
            return (
               
                <div className="container">
                    <div className="no-room-to-display">
                        <div className="text-to-display">
                            Loading Rooms
                        </div>
                    </div>
                </div>
            )
        }
        return (
         
            <div className="container">
                <div style={{ height: 50 }}></div>
                {rooms.map((room, i) => {
                    return (
                        <div className="room-display-container" key={i}>
                            <div className="room-image">
                                <img src={room.roomImage} alt="room-tag" />
                            </div>
                            <div className="room-details">
                                <div className="room-made-brand text-capitalize">{room.title} </div><br/>
                                <div className="room-detail">
                                   
                                    <Typography TypographyClassKey="h2">
                                        <strong>price per night:</strong> R{room.price}<br/>
                                        <strong>room number:</strong> {room.roomNumber}<br/>
                                        <strong>maximum number of guests:</strong> {room.guest}<br/>
                                    </Typography>
                                </div>
                                
                            </div>
                            
                            <div className="room-call-to-action">
                                <div className="call-to-action-buttons">
                                    {/* <div className="action-button">
                                        <button type="button" className="btn btn-secondary btn-block">Edit</button>
                                    </div> */}
                                    <div className="action-button">
                                        <DeleteItem post={room} onDelete={() => this.onDelete(i)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ViewItem ;
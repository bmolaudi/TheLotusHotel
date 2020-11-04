import React from 'react';
import RoomSummary from './RoomSummary';
import { Link } from 'react-router-dom';
 
const RoomList = ({rooms}) => {
    return (
        <div className="section">
            { rooms && rooms.map(room  => {
                return (
                    <Link to={'/room/' + room.id} key={room.id} >
                        <RoomSummary room={room} />
                    </Link>
                )
            })}
        </div>
    );
}
export default RoomList;
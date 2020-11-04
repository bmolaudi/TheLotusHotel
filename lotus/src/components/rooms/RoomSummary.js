import React from "react";

const RoomSummary = ({ room }) => {
  return (
    <div className="card z-depth-2">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{room.title}</span>
        <h5>{room.description}</h5>
      </div>
    </div>
  );
};
export default RoomSummary;

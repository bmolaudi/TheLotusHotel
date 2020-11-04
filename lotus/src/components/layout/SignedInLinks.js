import React, { Profiler } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authenticationActions";

const SignedInLinks = (props) => {
  return (
    <ul className="right">
      {/* <li>
        <NavLink to="/addroom">Create Room</NavLink>
      </li> */}
      <li>
        <a href="#" onClick={props.signOut}>
          Log Out
        </a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating red lighten-2">
          {props.profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(SignedInLinks);

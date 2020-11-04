import React, {useState}from 'react';
import { Link, useHistory } from 'react-router-dom';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from "./SignedOutLinks";
import Logo from '../../img/logo2.png'
import { connect } from 'react-redux';
import {getUserType} from '../../config/firebaseConfig';
import {useSelector, useDispatch} from 'react-redux';
import {setUserType, selectuserType} from '../../store/reducers/userTypeSlice';
import Button from '@material-ui/core/Button';


const Navbar = (props) => {
  const  [user, setUser] = useState();
  const { auth, profile } = props;  
  const type = useSelector(selectuserType);
  

  const dispatch = useDispatch();

  let history = useHistory();
  const handleAdmin = (e) => {
    e.preventDefault();
    async function fetchProduct() {
      
      await getUserType(auth.email).then(value =>{
        if (value !== null && value !== "undified"){
          dispatch(setUserType({userType: value}));
          if (value == "Owner" || value == "Manager" || value == "Clerk"){
            history.push("/adminHome")
          }
        }
      }).catch(err =>{
          console.log(err);
    
      });
    }fetchProduct();
    console.log(type);
   
  }
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
  return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            <div className="logo-container">
            <img src={Logo} alt="lotus logo"></img>
            </div>
          </Link>
          <ul className="right">
          <Button color="inherit"onClick={handleAdmin}>Admin</Button>
          </ul>
        { links }
        
        </div>
        
      </nav>
    );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};

export default connect(mapStateToProps)(Navbar);
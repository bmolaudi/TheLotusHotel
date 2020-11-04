import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {getBooking, updateBooking} from '../../config/firebaseConfig';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useDispatch} from 'react-redux';
import {selectuserType, setBooking} from '../../store/reducers/bookingSlice';
import {useHistory} from 'react-router-dom'

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

const CheckOut = () => {
    const history = useHistory();
   const dispatch = useDispatch();
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
    const  [data, setData] = useState([]);
    const  [response, setResponse] = useState({
           roomNumber: "",
           numberOfGuests: "",
           Status: "",
           checkIn: "",
           checkOut: "",
           AdditionalInformation: "",
           id: "",
    });

    const  [email, setEmail] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const  [clicked, setclicked] = useState("none");
    const [message, setMessage] = React.useState("");

    const  [roomNumber, setRoomNumber] = useState();
    const  [numberOfGuests, SetNumberOfGuests] = useState();
    const  [Status, setStatus] = useState();
    const  [checkIn, setCheckIn] = useState();
    const  [checkOut, setCheckOut] = useState();
    const  [Customer, setCustomer] = useState();
    const  [AdditionalInformation, setAdditionalInformation] = useState();
    const  [id, setId] = useState();
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        dispatch(setBooking({booking:response, }));
        history.push("/invoice");
        // dispatch(setUserType({userType: value}));

      };

    const handleChange = (event) => {
        let name = event.target.name;
      let value = event.target.value;
      if (value !== '')
      {
        switch (name) {
         case "email":
            setEmail(value);
           break;
         default:
           //required(value)
           break;
        }
      } 
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      async function fetchProduct() {
        
        await getBooking(email).then(value =>{
            console.log(email);
          if (value !== null){
          setResponse(value);
          setStatus(value.Status);
          setCheckIn(value.checkIn);
          setCheckOut(value.checkOut);
          setRoomNumber(value.roomNumber);
          setId(value.id);
          setCustomer(value.Customer);
          SetNumberOfGuests(value.numberOfGuests);
          setAdditionalInformation(value.AdditionalInformation);
          setclicked("block");
          }
        }).catch(err =>{
            console.log(err);
            setMessage("Could not find a booking, try again");
            handleOpen();
        
        });
        setIsLoading(false);
      }fetchProduct();
   
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        console.log(response);
        await updateBooking( id, Customer, "CheckedOut", checkIn, checkOut, numberOfGuests, roomNumber, AdditionalInformation).then(async () => {
            setTimeout(async function () {
                // setData(await getBookingDetails());
                setMessage("Checked Out successfully");
                handleOpen();
            }, 400).catch(err =>{
                setMessage("Something went wrong please try again");
                handleOpen();
            });
        });
    }
    return (
        
      <div className="container">

        <form onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Check In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email"value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          {/* <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
            />
          </div> */}
          <div className="input-field">
            <button className="btn red lighten-2 z-depth-0">Look Up</button>
          </div>
          <div className="red-text center">
            {/* {authError ? <p>{authError}</p> : null } */}
          </div>
        </form>
        <Box p={1} display={clicked}>
        <form onSubmit={handleSubmit2}>
            
          
    
    
          <div className="input-field">
            <button className="btn red lighten-2 z-depth-0">Check Out</button>
          </div>
          <div className="red-text center">
            {/* {authError ? <p>{authError}</p> : null } */}
          </div>
        </form>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

<div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Note</h2>
          <p id="simple-modal-description">
            {message}
          </p>
        </div>
      </Modal>

      </div>
      
    );
  }



export default(CheckOut);

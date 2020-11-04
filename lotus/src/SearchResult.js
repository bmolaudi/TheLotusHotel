import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import Button from '@material-ui/core/Button';
import {addBooking} from './config/firebaseConfig';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useSelector} from 'react-redux'

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
  


function SearchResult({
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    roomNumber,
    guest,
    checkIn,
    checkOut,
    Customer,
}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
    const handleCreateBooking = async (data)  => {
        await addBooking(Customer, "booked", checkIn.toDateString(), checkOut.toDateString(), guest, roomNumber, "    ").then(async () => {
            setTimeout(async function () {
                setMessage("Checked in successfully");
                handleOpen();
            }, 400).catch(err =>{
                setMessage("Something went wrong please try again");
                handleOpen();
            });
        });
        
    };
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
        <div className='searchResult'>
            <img src={img} alt="" />
            <FavoriteBorderIcon className="searchResult__heart" />

            <div className='searchResult__info'>
                <div className="searchResult__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description}</p>
                </div>

                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className='searchResults__price'>
                        <h2>{price}</h2>
                        <p>{total}</p>
                    </div>
                </div>
                <Button color="inherit" onClick={handleCreateBooking}>Book</Button>
            </div>
            
        </div>
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
    )
}

export default SearchResult

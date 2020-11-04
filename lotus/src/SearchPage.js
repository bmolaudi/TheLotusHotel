import React, {useState, useEffect} from 'react';
import {getRooms} from './config/firebaseConfig'
import './SearchPage.css';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import {selectStartDate} from './store/reducers/dateSlice';
import { useSelector, useDispatch } from 'react-redux';

function SearchPage() {

    var [data, setData] = useState([]);
    var [days, setDays] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const date = useSelector(selectStartDate);
    // const endDate = useSelector(selectEndDate);

    console.log(date.date);
    // console.log(endDate);
    useEffect(() => {
        setIsLoading(true);
        async function fetchProduct() {
            setData(await getRooms());
            setIsLoading(false);
    
        }
    
        fetchProduct();
    }, []);

    var isAuthenticated = null;
  useSelector((state) => {
    isAuthenticated= state.firebase.auth
  })
    function handleDays(){
        var date1 = new Date(date.date.startDate); 
        var date2 = new Date(date.date.endDate);
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        setDays(Difference_In_Time / (1000 * 3600 * 24));
    }

    return (
        
        <div className='searchPage'>
            {console.log(days)}
            <div className='searchPage__info'>
                <p> to {(days)}</p>
                <h1>Stays nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of place</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Rooms and beds</Button>
                <Button variant="outlined">More filters</Button>
            </div>
            {data?.map(data => <SearchResult img={data.addedRoom.roomImage}
            location="Johannesburg"
            title={data.addedRoom.title}
            description={data.addedRoom.guest+ "guest · Wifi · Kitchen · Free parking · Washing Machine"}
            star={5}
            price={data.addedRoom.price + " / night"}
            total="total"
            roomNumber={data.addedRoom.roomNumber}
            guest= {data.addedRoom.guest}
            checkIn={date.date.startDate}
            checkOut={date.date.endDate}
            Customer= {isAuthenticated.email}
            /> 
            )}
        </div>
    )
}

export default SearchPage

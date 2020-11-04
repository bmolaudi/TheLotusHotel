import React, {useState, useEffect} from 'react';
import './Home.css';
import Banner from './Banner'
import Card from './Card';
import {counter} from './config/firebaseConfig';
import {getRooms} from './config/firebaseConfig';
import Footer from './Footer';

// ES7 snippets to do 'rfce'

function Home() {
    var [data, setData] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            setData(await getRooms());
    
        }
    
        fetchProduct();
    }, []);
    return (
        <div className='home'>
            <Banner />

            <Footer />









            <div className='home__section'>
            </div>
            <div className='home__section'>
            {data.slice(0,3)?.map(data =>
            (<Card
                src={data.addedRoom.roomImage}
                title={data.addedRoom.title}
                description={data.addedRoom.guest+ "guest · Wifi · Kitchen · Free parking · Washing Machine"}
                price={"R"+data.addedRoom.price + " / night"}
            />))
            }
            </div>
            <Footer />
        </div>
        
    )
}

export default Home

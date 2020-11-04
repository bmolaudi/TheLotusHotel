import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./components/layout/NavBar";
import Dashboard from './components/dashboard/Dashboard';
import RoomDetails from './components/rooms/RoomDetails';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import AddRoom from './components/rooms/AddRoom';
import AdminHome from './components/admin/admin-home';
import GetInvoice from './components/admin/get-invoice';
import ManageBookings from './components/admin/manage-booking';
import GuestManagement from './components/admin/guest-management';
import Home from './Home';
import SearchPage from './SearchPage';
import ManageRooms from './components/admin/manage-rooms';
import CheckIn from './components/admin/check-in';
import CheckOut from './components/admin/check-out';
import Reports from './components/admin/report/report';

import "bootstrap/dist/css/bootstrap.min.css";
import "./components/admin/report/shards-dashboards.1.1.0.min.css";


class App extends Component {

  render() { 
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/room/:id" component={RoomDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addroom" component={AddRoom} />
            <Route path="/adminhome" component={AdminHome} />
            <Route path="/invoice" component={GetInvoice} />
            <Route path="/managebookings" component={ManageBookings} />
            <Route path="/manageguests" component={GuestManagement} />
            <Route path="/home" component={Home} />
            <Route path="/search" component={SearchPage} />
            <Route path="/managerooms" component={ManageRooms} />
            <Route path="/check-in" component={CheckIn} />
            <Route path="/check-out" component={CheckOut} />
            <Route path="/reports" component={Reports}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

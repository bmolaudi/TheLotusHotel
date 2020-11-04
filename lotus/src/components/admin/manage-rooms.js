import React, { Component } from "react";
import UploadItem from './upload-item';
import ViewItem from './view-item';
import './admin.css';
import AddIcon from '@material-ui/icons/Add';



class ManageRooms extends Component {
    state = {
        newItem: {}
    }
    

    handleOnSubmit = (item) => {
        this.setState({ newItem: item })
    }

    render() {
        const { newItem } = this.state;
        return ( 
            <div>
                <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <UploadItem handleOnSubmit={this.handleOnSubmit} />
                </div>
                <ViewItem newCar={newItem} />
                <div className="add-icon" >
                    <button className="btn btn-light" data-toggle="modal" data-target="#exampleModalScrollable">
                        <AddIcon color="primary"/>
                    </button>
                </div>
            </div>
        )
    }
}
  
export default (ManageRooms);
import React, { forwardRef, useEffect, useState }  from 'react';
import {Button} from '@material-ui/core';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {getBookingDetails, addBooking, deleteBooking, updateBooking} from '../../config/firebaseConfig';
import {MuiThemeProvider} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function ManageBookings() {

    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#4caf50',
          },
          secondary: {
            main: '#ff9100',
          },
        },
    
      });
     

  const [state, setState] = React.useState({
    columns: [
        { title: 'Customer', field: 'Customer'},
        { title: 'Status', field: 'Status' },
        { title: 'checkIn', field: 'checkIn', type: 'date'},
        { title: 'checkOut', field: 'checkOut',type: 'date'},
        { title: 'numberOfGuests', field: 'numberOfGuests',},
        { title: 'roomNumber', field: 'roomNumber',},
        { title: 'Additional information', field: 'AdditionalInformation',},
    ],
  });

    var [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        // By moving this function inside the effect, we can clearly see the values it uses.
        setIsLoading(true);
        async function fetchProduct() {
            // if (!firebase.apps.length) {
            //     firebase.initializeApp(firebaseConfig);
            // }
    
            setData(await getBookingDetails());
            setIsLoading(false);
    
        }
    
        fetchProduct();
    }, []);

    const handleCreateBooking = async (data)  => {
        setIsLoading(true);
        await addBooking(data.Customer, data.Status, data.checkIn, data.checkOut, data.numberOfGuests, data.roomNumber, data.AdditionalInformation).then(async () => {
            setTimeout(async function () {
                setData(await getBookingDetails());
                
            }, 400);
        });
        setIsLoading(false);
    };
    const handleEditBooking = async (data)  => {
        setIsLoading(true);
        await updateBooking(data.id,data.Customer, data.Status, data.checkIn, data.checkOut, data.numberOfGuests, data.roomNumber, data.AdditionalInformation).then(async () => {
            setTimeout(async function () {
                setData(await getBookingDetails());
                
            }, 400);
        });
        setIsLoading(false);
    };
    const handleDeleteBooking = async (id)  => {
        console.log(id);
        setIsLoading(true);
        await deleteBooking(id).then(async () => {
            setIsLoading(true);
            setTimeout(async function () {
                setData(await getBookingDetails());
                
            }, 400);
            setIsLoading(false);
        });
    
    };
    console.log(data);    
  return (
      <div>
    {/* <Button color="inherit">New Booking</Button> */}
    <MuiThemeProvider theme={theme}>
    <MaterialTable

        title="Bookings"
        columns={state.columns}
        data={(data)}
        icons={tableIcons}
        isLoading={isLoading}
        editable={{
            // isEditable: rowData => rowData.id === "id", // make id not editable
            onRowAdd: (newData) => handleCreateBooking(newData),
            onRowDelete: (oldData) => handleDeleteBooking(oldData.id),
            onRowUpdate: (newData, oldData) => handleEditBooking(newData)
        }}
    />
    </MuiThemeProvider>
    </div>
  );
}
export default ManageBookings;
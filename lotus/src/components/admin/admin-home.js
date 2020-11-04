import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link} from 'react-router-dom';
import {Box} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import KingBedIcon from '@material-ui/icons/KingBed';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PaymentIcon from '@material-ui/icons/Payment';
import {useSelector} from 'react-redux';
import {selectuserType} from '../../store/reducers/userTypeSlice'

const useStyles = makeStyles((theme) =>({
    welcomer: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(20),
        width: '206px',
        height: '40px',
        textAlign: 'left',
        letterSpacing: '0px',
        color: '#040303',
        opacity: '1',
    },
    task: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(20),
        width: '277px',
        height: '33px',
        textAlign: 'left',
        font: 'normal normal 300 25px/33px Segoe UI',
        letterSpacing: '0px',
        color: '#040303',
        opacity: 1,  
    },
    card: {
        minWidth: 275,
        margin: 'auto',
        width: '25%',
        left: '250px',
        // height: '428px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #0400009E',
        border: '1px solid #FFFFFF',
        borderRadius: '6px',
        opacity: '0.6',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      boxes:{
        margin: 'auto',
      }
  }));

function AdminHome(){
  const type = useSelector(selectuserType);
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    console.log(type);
    return(
    <div>
        <Typography className={classes.welcomer}><strong>Welcome</strong>, </Typography>
        <Typography className={classes.task}>Select a task to get started</Typography>
        <Box display="flex" flexDirection="row" p={1} mx="auto">
        <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/check-in">
              <CardContent>
                
                <CheckBoxIcon fondSize="large"></CheckBoxIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>Check-in</strong>
                </Typography>
            
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
        </Card>
        </Box>
        <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/check-out">
              <CardContent>
                
                <IndeterminateCheckBoxIcon fondSize="large"></IndeterminateCheckBoxIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>check-out</strong>
                </Typography>
            
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
        </Card>
        </Box>
        </Box>
        {(type.userType === "Manager" || type.userType === "Owner") ?
        (
        <div>
          <Box display="flex" flexDirection="row" p={1} mx="auto">
          <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/managerooms">
              <CardContent>
                
                <KingBedIcon fondSize="large"></KingBedIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>manage-rooms</strong>
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
          </Card>
        </Box>
        <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/manageguests">
              <CardContent>
                
                <LibraryBooksIcon fondSize="large"></LibraryBooksIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>manage-user</strong>
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
          </Card>
        </Box>
        </Box>
        <Box display="flex" flexDirection="row" p={1} mx="auto">
          <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/managebookings">
              <CardContent>
                
                <PaymentIcon fondSize="large"></PaymentIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>manage-booking</strong>
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
          </Card>
        </Box>
        
          <Box p={1} mx="auto">
            <Card className={classes.card}>
              <Link to="/reports">
              <CardContent>
                
                <AssessmentIcon fondSize="large"></AssessmentIcon>
                <Typography className={classes.pos} color="textSecondary">
                <strong>Reports</strong>
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
          </Link>
          </Card>
        </Box>
        </Box>
        </div>
        ): (<div/>)
        }
        
  </div>
    
  );
}

export default AdminHome;
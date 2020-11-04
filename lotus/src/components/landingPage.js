import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import car1 from '../../assets/images/car1.png';
import car2 from '../../assets/images/car2.png';
import car3 from '../../assets/images/car3.png';
import car4 from '../../assets/images/car4.png';
import logo from '../../assets/images/logo.png';
import VehicleFilters from '../vehicleFilters/VehicleFilter';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// @ts-ignore
import Slider from 'react-slick';
import PersistentDrawerRight from './persistentDrawerRight';
import Footer from '../footer/Footer';
import {CssBaseline} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  homeContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: '75px',
  },
  img: {
    width: '100%',
  },
  imageContainer: {
    // position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    zIndex: -9999,
  },
  // logoContainer: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   paddingTop: '15px',
  //   marginBottom: '25px',
  //   background: 'blue'
  // },
  menuIcon: {
    color: theme.palette.primary.main,
    fontSize: '35px',
  },
  logoMenuContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    position: 'absolute',
  },
}));

const Home = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function sliderImages() {
    return [car1, car2, car3, car4].map((image, index) => {
      return (
        <img key={index} alt={image} src={image} className={classes.img} />
      );
    });
  }

  const settings = {
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 200,
    swipeToSlide: false,
    slidesToShow: 1,
  };

  return (
    <Box>
      {/* <CssBaseline /> */}
      <Box className={classes.homeContainer}>
        <Box className={classes.logoMenuContainer}>
          <img alt="logo" src={logo} className={classes.logo} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(true)}
            // className={clsx(open && classes.hide)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Box>

        <VehicleFilters />

        <Box className={classes.imageContainer}>
          <Slider {...settings}>{sliderImages()}</Slider>
        </Box>

        <PersistentDrawerRight open={open} setOpen={setOpen} />
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;

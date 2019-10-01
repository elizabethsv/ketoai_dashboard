import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


  const useStyles = makeStyles(theme => ({
    mapImage: {
        position: 'relative',
        backgroundColor: '#02A1E2',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '1000px'
    },
    mapFont: {
        textAlign: 'center',
    }
  }));
  
  export default function RouteMap() {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Title>Route Map</Title>
        <Paper className={classes.mapImage} >
        <Typography className={classes.mapFont} component="h1" variant="h3" color="inherit" >
                    Map Goes Here
                  </Typography>
            </Paper>


      </React.Fragment>
    );
  }
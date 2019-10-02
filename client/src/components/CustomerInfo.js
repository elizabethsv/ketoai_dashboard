import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpacityIcon from '@material-ui/icons/Opacity';


const useStyles = makeStyles(theme => ({

  depositContext: {
    flex: 1,
  },
  iconDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconFont: {
    fontSize: '.8vw',
  }
}));



export default function CustomerInfo() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="p" className={classes.depositContext}>
        Name: John Doe
      </Typography>
      <Typography component="p" className={classes.depositContext}>
        Address: 1334 Brittmoore Rd, Houston, TX 77043
      </Typography>
      <Typography component="p" className={classes.depositContext}>
        Live Data: 
      </Typography>
      <div className={classes.iconDisplay}>
          
            <OpacityIcon />
            <p className={classes.iconFont}>pH: 7.1</p>
            <MoreVertIcon />
            <p className={classes.iconFont}>ORP: 550</p>
      </div>
      </React.Fragment>
  );
}
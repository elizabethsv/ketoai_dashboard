import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({

  depositContext: {
    flex: 1,
  },
  iconDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFont: {
    fontSize: '12px',
    paddingRight: '10px'
  },
  iconFontEnd: {
    fontSize: '12px',
    paddingRight: '10px',
    marginLeft: '-5px',
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
        <Icon className='fas fa-thermometer-three-quarters'></Icon>
        <p className={classes.iconFont}>89.1 F</p>
        <Icon className='fas fa-tint'></Icon>
        <p className={classes.iconFont}>pH: 7.1</p>
        <Icon className='fas fa-ellipsis-v'></Icon>
        <p className={classes.iconFontEnd}>ORP: 550</p>

      </div>
      </React.Fragment>
  );
}
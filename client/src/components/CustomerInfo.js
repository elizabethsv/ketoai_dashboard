import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpacityIcon from '@material-ui/icons/Opacity';
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
            <Icon></Icon>
            <OpacityIcon />
            <p className={classes.iconFont}>pH: 7.1</p>
            <MoreVertIcon />
            <p className={classes.iconFontEnd}>ORP: 550</p>
      </div>
      </React.Fragment>
  );
}
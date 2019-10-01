import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import { Paper } from '@material-ui/core';

 
const useStyles = makeStyles(theme => ({
    fillClass: {
        height: "200px",
    }

}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Technician Routes</Title>
      <Paper>
          <div className={classes.fillClass}></div>
      </Paper>
    </React.Fragment>
  );
}
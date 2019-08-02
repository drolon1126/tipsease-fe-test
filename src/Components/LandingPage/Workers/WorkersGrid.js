import React, { useState, useEffect, useContext } from 'react';
import { WorkersListContext, FilterContext } from '../../Context/Contexts'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WorkerCard from './WorkerCard';
import axios from 'axios';
import mockData from './MockData';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    background: '#202020',
    color: '#c9c9c9',
    boxShadow: '0px 4px 12px 0px rgba(201,201,201,1)',
    margin: '0 auto',
  },
}));

function WorkersGrid(props) {

  const {workerList, setWorkerList} = useContext(WorkersListContext);
  const { filter, setFilter } = useContext(FilterContext);

  const classes = useStyles();

  /*useEffect(() => {
    axios.get('https://tipsease-be-test.herokuapp.com/api/tippees')

      .then(res => {
        console.log(res.data);
        setWorkers(res.data);
      })

      .catch(err => {
        console.log(err);
      })
  }, [])*/

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {workerList.map(worker => {
          if (filter === 'all' || filter === worker.tagline) {
            return (
              <Grid item xs={12} md={9} lg={6}>
                <Paper className={classes.paper}>
                  <WorkerCard id={worker.id} key={worker.index} tagline={worker.tagline} photo_url={worker.photo_url} firstName={worker.first_name} lastName={worker.last_name} modal={props.modal} toggleModal={props.toggleModal} />
                </Paper>
              </Grid>
            );
          }
        }
        )}
      </Grid>
    </div>
  );
}

export default WorkersGrid;
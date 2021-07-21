import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import client from '../feather';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    buttonCheckpoint: {
        margin: theme.spacing(1)
      },
  }));

  
export default function RouteCheckpointControl({routeStarted, setRouteStarted, currentRoute, 
  currentCheckpoints, currentCheckpoint, setCurrentCheckpoint,
  currentPath, setCurrentPath,
  currentIndex, setCurrentIndex,showConfirmStop, setShowConfirmStop, reachedEndRoute, setReachedEndRoute}) {

    const classes = useStyles();
    let history = useHistory ();

    // useEffect(() => {
    //     if (!routeStarted){
    //         setIndexCheckpoint(currentCheckpoint.index);
    //         setCurrentIndex(0);
    //         //setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
    //     }
    // }, [currentCheckpoint, routeStarted, currentRoute]);





    const handleClick = (event) => {
       switch (event.currentTarget.name) {
           case "checkpoint":
               let newPath = currentPath;
               let ts = Math.floor(Date.now() / 1000)
               let indexCheckpoint = currentCheckpoint.index;
              newPath.routeTag = currentRoute.tag;
              newPath.routeId = currentRoute._id;
               let floor = currentCheckpoints[indexCheckpoint].floor ? currentCheckpoints[indexCheckpoint].floor : "";
               newPath.checkpoints[currentIndex] = {
                 tag:currentCheckpoints[indexCheckpoint].tag, 
                 x:currentCheckpoints[indexCheckpoint].x,
                 y:currentCheckpoints[indexCheckpoint].y,
                 floor:floor,
                 timestamp:ts};
               setCurrentPath(newPath);
               if ((indexCheckpoint + 1) >= currentCheckpoints.length){
                  setRouteStarted(false);
                  setShowConfirmStop(true);
                  setCurrentCheckpoint({point:{tag:"END", x:0, y:0, floor:"-"}, index:0});
                  setReachedEndRoute(true)
               } else {
                 console.log("CurrentIndex: " + currentIndex);
                  
                  setCurrentCheckpoint({point:currentCheckpoints[currentIndex + 1], index:currentIndex + 1});
                  setCurrentIndex(currentIndex+1);
               }

               break;
           default:
               break;      
       }
       event.stopPropagation();
      };
  

      const stopPropagation = (event) => {
          event.stopPropagation();
      };
    return (
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonCheckpoint}
              onClick={handleClick}
              name="checkpoint"
              fullWidth
              size="large"
              disabled={!routeStarted}
            >
              Checkpoint
            </Button>
          </Grid>
        </Grid>
    );
  }
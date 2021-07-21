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

  
export default function RouteControl({routeStarted, setRouteStarted, currentRoute, 
  currentCheckpoints, currentCheckpoint, setCurrentCheckpoint,
  currentPath, setCurrentPath, indexCheckpoint, setIndexCheckpoint,
  currentIndex, setCurrentIndex,showConfirmStop, setShowConfirmStop, reachedEndRoute, setReachedEndRoute}) {

    const classes = useStyles();
    let history = useHistory ();

    let tagButtonStart, colorButtonStart, nameButtonStart;

    if (routeStarted){
        tagButtonStart = "Stop";
        colorButtonStart = "secondary";
        nameButtonStart = "stop";
    } else {
        tagButtonStart = "Start";
        colorButtonStart = "primary";
        nameButtonStart = "start";
    }


    const handleClick = (event) => {
       switch (event.currentTarget.name) {
            case "start":
                setReachedEndRoute(false);
                setRouteStarted(true);

                break;
            case "stop":
                setShowConfirmStop(true);
                break;
            case "cancel":
                 setShowConfirmStop(false);
                break;
            case "confirm_stop":
                setReachedEndRoute(false);
                setRouteStarted(false);
                setShowConfirmStop(false);
                client.service('paths').create(currentPath).then(() => {
                    console.log("Path saved");
                    setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
                    setCurrentCheckpoint({point:currentRoute.points[0], index:0});
                  }).catch((err) => {
                      //Maybe not authentication
                      history.push("/");
                      console.log(err);
                  });
                break;
           default:
               break;      
       }
       event.stopPropagation();
      };
  

      const stopPropagation = (event) => {
          event.stopPropagation();
      };


      if (showConfirmStop && reachedEndRoute){
        return (
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
                <Button
                variant="outlined"
                color="secondary"
                name="confirm_stop"
                onClick={handleClick}
                className={classes.button}
                >
                Stop
                </Button>
              </Grid>
          </Grid>);
      };

      if (showConfirmStop){
        return (
        <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
            <Button
            variant="outlined"
            color="primary"
            name="cancel"
            onClick={handleClick}
            className={classes.button}
            >
            Cancel
            </Button>
        </Grid>
        <Grid item>
            <Button
            variant="outlined"
            color="secondary"
            name="confirm_stop"
            onClick={handleClick}
            className={classes.button}
            >
            Yes, stop
            </Button>
        </Grid>
    </Grid>);
      };

    return (
        <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item>
          <span>
          <Button
            variant="outlined"
            color={colorButtonStart}
            name={nameButtonStart}
            onClick={handleClick}
            className={classes.button}
            size="medium"
          >
          {tagButtonStart}
          </Button>
          </span>
        </Grid> 
        </Grid>
    );
  }
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

  
export default function RouteControl({routeStarted, setRouteStarted, currentRoute, currentCheckpoints, currentCheckpoint, setCurrentCheckpoint}) {
    const classes = useStyles();
    let history = useHistory ();
    const [currentPath, setCurrentPath] = useState({routeTag:currentRoute.tag, checkpoints:[]});
    const [indexCheckpoint, setIndexCheckpoint] = useState(currentCheckpoint.index);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConfirmStop, setShowConfirmStop] = useState(false);

    useEffect(() => {
        if (!routeStarted){
            setIndexCheckpoint(currentCheckpoint.index);
            setCurrentIndex(0);
            //setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
        }
    }, [currentCheckpoint, routeStarted, currentRoute]);


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
           case "checkpoint":
               let newPath = currentPath;
               let ts = Math.floor(Date.now() / 1000)
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
               } else {
                  setCurrentIndex(currentIndex+1);
                  setIndexCheckpoint(indexCheckpoint + 1);
                  setCurrentCheckpoint({point:currentCheckpoints[indexCheckpoint + 1], index:indexCheckpoint + 1});
               }

               break;
            case "start":
                setRouteStarted(true);
                break;
            case "stop":
                setShowConfirmStop(true);
                break;
            case "cancel":
                 setShowConfirmStop(false);
                break;
            case "confirm_stop":
                setRouteStarted(false);
                setShowConfirmStop(false);
                client.service('paths').create(currentPath).then(() => {
                    console.log("Path saved");
                    setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
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

        { showConfirmStop ? 
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
        </Grid> :       
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
      }

        </Grid>
    );
  }
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import RouteSelector from '../components/RouteSelector';
import CheckpointSelector from '../components/CheckpointSelector';
import CheckpointInfo from '../components/CheckpointInfo';
import RouteControl from "../components/RouteControl";
import RouteCheckpointControl from "../components/RouteCheckpointControl";
import client from '../feather';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function RoutePage({routeStarted, setRouteStarted, isLogged, setIsLogged}) {

    const classes = useStyles();
    let history = useHistory ();
    const [routes, setRoutes] = useState([]);
    const [currentRoute, setCurrentRoute] = useState({});
    const [currentCheckpoints, setCurrentCheckpoints] = useState([]);
    const [currentCheckpoint, setCurrentCheckpoint] = useState({point:undefined, index:0});

    const [currentPath, setCurrentPath] = useState({routeTag:currentRoute.tag, checkpoints:[]});
    const [indexCheckpoint, setIndexCheckpoint] = useState(currentCheckpoint.index);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConfirmStop, setShowConfirmStop] = useState(false);
    const [reachedEndRoute, setReachedEndRoute] = useState(false);



    useEffect(() => {
        client.service('routes').find({}).then((routes) => {
            console.log(routes.data);
            setRoutes(routes.data);
            setCurrentRoute(routes.data[0]);
            setCurrentCheckpoints(routes.data[0].points)
            setCurrentCheckpoint({point:routes.data[0].points[0], index:0});
            setCurrentPath({routeTag:routes.data[0].tag, checkpoints:[]})
            setCurrentIndex(0);
            setIndexCheckpoint(0);
          }).catch((err) => {
              //Maybe not authentication
              history.push("/");
              console.log(err);
          });
    }, []);

    useEffect(() => {
     if (!isLogged){
           history.push("/");
     }
    }, [isLogged]);

    

    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

          { routeStarted || reachedEndRoute? 
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
    >
                      <Grid item>
                <RouteControl
                  routeStarted={routeStarted}
                  setRouteStarted={setRouteStarted}
                  currentRoute={currentRoute}
                  currentCheckpoints={currentCheckpoints} 
                  currentCheckpoint={currentCheckpoint}
                  setCurrentCheckpoint={setCurrentCheckpoint}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  indexCheckpoint={indexCheckpoint}
                  setIndexCheckpoint={setIndexCheckpoint}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  showConfirmStop={showConfirmStop}
                  setShowConfirmStop={setShowConfirmStop}
                  reachedEndRoute={reachedEndRoute}
                  setReachedEndRoute={setReachedEndRoute}
                  />
                </Grid>
                <Grid item>
                <CheckpointInfo 
                currentCheckpoint={currentCheckpoint}/>
                </Grid>
                {showConfirmStop?
                    <Grid item />
                  :
                  <Grid item>
                  <RouteCheckpointControl
                    routeStarted={routeStarted}
                    setRouteStarted={setRouteStarted}
                    currentRoute={currentRoute}
                    currentCheckpoints={currentCheckpoints} 
                    currentCheckpoint={currentCheckpoint}
                    setCurrentCheckpoint={setCurrentCheckpoint}
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}
                    indexCheckpoint={indexCheckpoint}
                    setIndexCheckpoint={setIndexCheckpoint}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    showConfirmStop={showConfirmStop}
                    setShowConfirmStop={setShowConfirmStop}
                    reachedEndRoute={reachedEndRoute}
                    setReachedEndRoute={setReachedEndRoute}
                    />
                  </Grid>
                }
                </Grid>
              :
              <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
    >
              <Grid item>
              <RouteSelector 
                  routes={routes} 
                  currentRoute={currentRoute} 
                  setCurrentRoute={setCurrentRoute}
                  setCurrentCheckpoints={setCurrentCheckpoints}
                  setCurrentCheckpoint={setCurrentCheckpoint} />
              </Grid>
              <Grid item>
              <CheckpointSelector 
                  currentCheckpoints={currentCheckpoints}
                  setCurrentCheckpoint={setCurrentCheckpoint} 
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}/>
              </Grid>
              <Grid item>
              <CheckpointInfo 
                  currentCheckpoint={currentCheckpoint}/>
              </Grid>
              <Grid item>
              <RouteControl
                  routeStarted={routeStarted}
                  setRouteStarted={setRouteStarted}
                  currentRoute={currentRoute}
                  currentCheckpoints={currentCheckpoints} 
                  currentCheckpoint={currentCheckpoint}
                  setCurrentCheckpoint={setCurrentCheckpoint}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  indexCheckpoint={indexCheckpoint}
                  setIndexCheckpoint={setIndexCheckpoint}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  showConfirmStop={showConfirmStop}
                  setShowConfirmStop={setShowConfirmStop}
                  reachedEndRoute={reachedEndRoute}
                  setReachedEndRoute={setReachedEndRoute}
                  />
              </Grid>
              </Grid>
          }
        
        </div>
        </Container>

    );
}
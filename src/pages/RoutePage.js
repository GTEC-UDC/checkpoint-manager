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


export default function RoutePage({isLogged, setIsLogged}) {

    const classes = useStyles();
    let history = useHistory ();
    const [routes, setRoutes] = useState([]);
    const [currentRoute, setCurrentRoute] = useState({});
    const [currentCheckpoints, setCurrentCheckpoints] = useState([]);
    const [currentCheckpoint, setCurrentCheckpoint] = useState({point:undefined, index:0});

    const [routeStarted, setRouteStarted] = useState(false);

    useEffect(() => {
        client.service('routes').find({}).then((routes) => {
            console.log(routes.data);
            setRoutes(routes.data);
            setCurrentRoute(routes.data[0]);
            setCurrentCheckpoints(routes.data[0].points)
            setCurrentCheckpoint({point:routes.data[0].points[0], index:0});
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
                    setCurrentCheckpoint={setCurrentCheckpoint} />
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
                    />
            </Grid>

        </Grid>
        </div>
        </Container>

    );
}
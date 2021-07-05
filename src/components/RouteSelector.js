import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "100%"
    }
  }));


export default function RouteSelector({routes, currentRoute, setCurrentRoute, setCurrentCheckpoints, setCurrentCheckpoint}) {
    const classes = useStyles();
    const handleChange = (event) => {
        switch (event.target.name) {
            case "route":
                let route = event.target.value;
                setCurrentRoute(route);
                setCurrentCheckpoints(route.points);
                setCurrentCheckpoint({point:route.points[0], index:0});

                break;
            default:
                break;
        } 
      };

  return (
        <FormControl className={classes.formControl}>
            <InputLabel id="label-ruta">Route</InputLabel>
            <Select
            labelId="label-ruta"
            id="select-ruta"
            value={currentRoute}
            name ="route"
            onChange={handleChange}
            fullWidth
            >
            {routes.map((ob, i) => (<MenuItem key={ob.tag} value={ob}>{ob.tag}</MenuItem>))}
            </Select>
        </FormControl>
  );
}
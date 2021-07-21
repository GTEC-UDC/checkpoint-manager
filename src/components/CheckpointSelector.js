import React, { useState } from "react";
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


export default function CheckpointSelector({currentCheckpoints, setCurrentCheckpoint, currentIndex, setCurrentIndex}) {
    const classes = useStyles();

    const handleChange = (event) => {
        setCurrentIndex(event.target.value);
        setCurrentCheckpoint({point:currentCheckpoints[event.target.value], index:event.target.value});
      };

  return (

        <FormControl className={classes.formControl}>
            <InputLabel id="label-checkpoint">Start point</InputLabel>
            <Select
            fullWidth
            labelId="label-checkpoint"
            id="select-checkpoint"
            name ="checkpoint"
            value={currentIndex}
            onChange={handleChange}
            >
            {currentCheckpoints.map((ob, i) => (<MenuItem key={ob.tag} value={i}>{ob.tag}</MenuItem>))}
            </Select>
        </FormControl>

  );
}
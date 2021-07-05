import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 275,
    width: "100%",
    margin:theme.spacing(1)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


export default function CheckpointInfo({currentCheckpoint}) {
    const classes = useStyles();
    
    let tag;

    if (currentCheckpoint.point!==undefined){
        tag = currentCheckpoint.point.tag;
    } else {
        tag = "--";
    }


  return (

        <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Next
        </Typography>
        <Typography variant="h5" component="h2">
            {tag}
        </Typography>
        </CardContent>
    </Card>

  );
}
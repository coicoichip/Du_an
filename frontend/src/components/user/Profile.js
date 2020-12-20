import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import { Redirect, Link } from "react-router-dom";
import MyOrders from "./../order/MyOrders";
import { useSelector } from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
  stripe_connect: {
    marginRight: "10px",
  },
  stripe_connected: {
    verticalAlign: "super",
    marginRight: "10px",
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const auth = useSelector(s => s.auth)

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={auth?.name} secondary={auth?.email} />{" "}
          {auth.email && (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + auth.user_id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              {/* <DeleteUser userId={auth.user_id} /> */}
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + moment(auth?.created_at).format('MM DD YYYY')}
          />
        </ListItem>
      </List>
      {auth.position === "customer" && <MyOrders />}
    </Paper>
  );
}

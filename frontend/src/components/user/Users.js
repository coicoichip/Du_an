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
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteUser from "./DeleteUser";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/auth";
const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const handleRemove = (user_id) => {
    dispatch(deleteUser({ user_id }));
    setUsers([...users.filter((u) => u.user_id !== user_id)]);
  };
  const handleUpgrade = (email) => {
    axios({
      method: "POST",
      url: `${BASE_URL}/upgrade_user`,
      withCredentials: true,
      data: {
        email,
      },
    }).then(({ data: { data } }) => {
      axios({
        method: "GET",
        url: `${BASE_URL}/users`,
        withCredentials: true,
      }).then(({ data: { data } }) => {
        setUsers(data);
      });
    });
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/users`,
      withCredentials: true,
    }).then(({ data: { data } }) => {
      setUsers(data);
    });
  }, []);
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.filter(u => u.name !== "admin").map((item, i) => {
          return (
            <Link key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={item.img_url}>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.email} />
                <ListItemText primary={item.position} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleUpgrade(item.email)}>
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteUser onRemove={() => handleRemove(item.user_id)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}

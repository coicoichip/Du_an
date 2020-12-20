import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../redux/restaurants.js";
import { DEFAULT_AVATAR } from "../../config.js";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: "center",
    fontSize: "1.2em",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  subheading: {
    color: theme.palette.text.secondary,
  },
  shopTitle: {
    fontSize: "1.2em",
    marginBottom: "5px",
  },
  details: {
    padding: "24px",
  },
}));
export default function Shops() {
  const classes = useStyles();
  const restaurants = useSelector((s) => s.restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Restaurants
        </Typography>
        <List dense>
          {restaurants.map((res, i) => {
            return (
              <Link to={"/restaurants/" + res.id} key={i}>
                <Divider />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar} src={DEFAULT_AVATAR} />
                  </ListItemAvatar>
                  <div className={classes.details}>
                    <Typography
                      type="headline"
                      component="h2"
                      color="primary"
                      className={classes.shopTitle}
                    >
                      {res.name}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h4"
                      className={classes.subheading}
                    >
                      {res.address}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </Link>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

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
import { getRestaurants, resetRestaurants } from "../../redux/restaurants.js";
import { BASE_URL, DEFAULT_AVATAR } from "../../config.js";
import axios from "axios";
import { notifyErrorMsg } from "../../redux/Alert.js";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarBorder from "@material-ui/icons/StarBorder";
import { Grid } from "@material-ui/core";
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
  const [rates, setRates] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants());
    return () => {
      dispatch(resetRestaurants());
    };
  }, []);
  useEffect(() => {
    restaurants.forEach((r) => {
      axios({
        method: "GET",
        url: `${BASE_URL}/restaurants/${r.id}/rates`,
        withCredentials: true,
      })
        .then(({ data: { data: { avg } } }) =>
          setRates({ ...rates, [r.id]: avg })
        )
        .catch((err) => notifyErrorMsg(err));
    });
  }, [restaurants]);
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
                    <Avatar className={classes.avatar} src={res?.img_url} />
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
                  <div
                    className={classes.details}
                    style={{ marginLeft: "auto" }}
                  >
                    <Grid container className="ml-auto mr-auto">
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= rates[res.id] ? (
                          <StarIcon
                            style={{ cursor: "pointer", fill: 'black' }}
                          />
                        ) : (
                          <StarBorder
                            style={{ cursor: "pointer", fill: 'black' }}
                          />
                        )
                      )}
                    </Grid>
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

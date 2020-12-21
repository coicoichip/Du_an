import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import { Redirect, Link } from "react-router-dom";
import DeleteShop from "./DeleteShop";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant, getRestaurants } from "../../redux/restaurants";
import { DEFAULT_IMAGE } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

export default function MyShops() {
  const classes = useStyles();
  const auth = useSelector((s) => s.auth);
  const restaurants = useSelector((s) => s.restaurants);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  const removeShop = (resId) => {
    dispatch(deleteRestaurant({resId}))
  };

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Restaurants
          <span className={classes.addButton}>
            <Link to="/seller/restaurant/new">
              <Button color="primary" variant="contained">
                <AddBoxIcon className={classes.leftIcon} /> New Restaurant
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {restaurants.map((restaurant, i) => {
            return (
              <span key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        restaurant?.img_url || DEFAULT_IMAGE + 300
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={restaurant.name}
                    secondary={restaurant.description}
                  />
                  {auth.position === "owner" && (
                    <ListItemSecondaryAction>
                      <Link
                        to={
                          "/seller/orders/" +
                          restaurant.name +
                          "/" +
                          restaurant.id
                        }
                      >
                        <Button aria-label="Orders" color="primary">
                          View Orders
                        </Button>
                      </Link>
                      <Link to={"/seller/restaurant/edit/" + restaurant.id}>
                        <IconButton aria-label="Edit" color="primary">
                          <Edit />
                        </IconButton>
                      </Link>
                      <DeleteShop shop={restaurant} onRemove={() => removeShop(restaurant.id)} />
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                <Divider />
              </span>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

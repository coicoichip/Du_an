import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetBills, getTotalBills } from "../../redux/bills";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "12px 24px",
    padding: theme.spacing(3),
    backgroundColor: "#3f3f3f0d",
  }),
  title: {
    margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(1)}px`,
    color: theme.palette.openTitle,
  },
}));

export default function MyOrders() {
  const classes = useStyles();
  const orders = useSelector((s) => s.bills);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getTotalBills());
    return () => {
      dispatch(resetBills());
    };
  }, []);
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Your Orders
      </Typography>
      <List dense>
        {orders.map((order, i) => {
          return (
            <span key={i}>
              <Link
                to={{
                  pathname: "/order/" + order.id,
                  state: {order}
                }}
              >
                <ListItem button>
                  <ListItemText
                    primary={<strong>{"Order # " + order.id}</strong>}
                    secondary={moment.utc(order.create_time).local().format("MM/DD/YYYY HH:mm")}
                  />
                </ListItem>
              </Link>
              <Divider />
            </span>
          );
        })}
      </List>
    </Paper>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import ProductOrderEdit from "./ProductOrderEdit";
import { useDispatch, useSelector } from "react-redux";
import { getBills, resetBills } from "../../redux/bills";

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
  subheading: {
    marginTop: theme.spacing(1),
    color: "#434b4e",
    fontSize: "1.1em",
  },
  customerDetails: {
    paddingLeft: "36px",
    paddingTop: "16px",
    backgroundColor: "#f8f8f8",
  },
}));
export default function ShopOrders({ match }) {
  const classes = useStyles();
  const [open, setOpen] = useState(0);
  const orders = useSelector((s) => s.bills);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBills({ resId: match.params.resId }));
    return () => {
      dispatch(resetBills())
    }
  }, []);

  const handleClick = (index) => (event) => {
    setOpen(index);
  };

  const updateOrders = (index, updatedOrder) => {
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Orders in {match.params.shop}
        </Typography>
        <List dense>
          {orders.map((order, index) => {
            return (
              <span key={index}>
                <ListItem button onClick={handleClick(index)}>
                  <ListItemText
                    primary={"Order # " + order.id}
                    secondary={new Date(order.create_time).toDateString()}
                  />
                  {open == index ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Divider />
                <Collapse
                  component="li"
                  in={open == index}
                  timeout="auto"
                  unmountOnExit
                >
                  <ProductOrderEdit
                    shopId={match.params.resId}
                    order={order}
                    orderIndex={index}
                    updateOrders={updateOrders}
                  />
                  <div className={classes.customerDetails}>
                    <Typography
                      type="subheading"
                      component="h3"
                      className={classes.subheading}
                    >
                      Deliver to:
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      <strong>{order.recipient_name}</strong> (
                      {order.recipient_email})
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      {order.recipient_address}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      {order.note}
                    </Typography>
                    <br />
                  </div>
                </Collapse>
                <Divider />
              </span>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

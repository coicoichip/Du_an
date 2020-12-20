import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../redux/bills";
import { getFoodsByResId, resetFoods } from "../../redux/foods";
import { getBill } from "../../apis/bills";
import { resetBillDetails } from "../../redux/billDetails";
import moment from "moment";
import {
  getRestaurant,
  getRestaurants,
  resetRestaurants,
} from "../../redux/restaurants";
import { DEFAULT_IMAGE } from "../../config";
const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    margin: 30,
  },
  cart: {
    textAlign: "left",
    width: "100%",
    display: "inline-flex",
  },
  details: {
    display: "inline-block",
    width: "100%",
    padding: "4px",
  },
  content: {
    flex: "1 0 auto",
    padding: "16px 8px 0px",
  },
  cover: {
    width: 160,
    height: 125,
    margin: "8px",
  },
  info: {
    color: "rgba(83, 170, 146, 0.82)",
    fontSize: "0.95rem",
    display: "inline",
  },
  thanks: {
    color: "rgb(136, 183, 107)",
    fontSize: "0.9rem",
    fontStyle: "italic",
  },
  innerCardItems: {
    textAlign: "left",
    margin: "24px 10px 24px 24px",
    padding: "24px 20px 40px 20px",
    backgroundColor: "#80808017",
  },
  innerCard: {
    textAlign: "left",
    margin: "24px 24px 24px 10px",
    padding: "30px 45px 40px 45px",
    backgroundColor: "#80808017",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
  productTitle: {
    fontSize: "1.15em",
    marginBottom: "5px",
  },
  itemTotal: {
    float: "right",
    marginRight: "40px",
    fontSize: "1.5em",
    color: "rgb(72, 175, 148)",
  },
  itemShop: {
    display: "block",
    fontSize: "1em",
    color: "#78948f",
  },
  checkout: {
    float: "right",
    margin: "24px",
  },
  total: {
    fontSize: "1.2em",
    color: "rgb(53, 97, 85)",
    marginRight: "16px",
    fontWeight: "600",
    verticalAlign: "bottom",
  },
}));

export default function Order({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    state: { order },
  } = useLocation();
  console.log("========================================");
  console.log(order);
  const foods = useSelector((s) => s.foods);
  const restaurants = useSelector((s) => s.restaurants);
  useEffect(() => {
    dispatch(getFoodsByResId({ resId: order.restaurant_id }));
    dispatch(getRestaurants());
    return () => {
      dispatch(resetFoods());
      dispatch(resetRestaurants());
      dispatch(resetBillDetails());
    };
  }, []);
  useEffect(() => {
    dispatch(getBills({ resId: match.params.resId }));
  }, []);
  return (
    <Card className={classes.card}>
      <Typography type="headline" component="h2" className={classes.title}>
        Order Details
      </Typography>
      <Typography
        type="subheading"
        component="h2"
        className={classes.subheading}
      >
        Order Code: <strong>{order.id}</strong> <br /> Placed on{" "}
        {moment(order.created_at).format("MM DD YYYY")}
      </Typography>
      <br />
      <Grid container spacing={4}>
        <Grid item xs={7} sm={7}>
          <Card className={classes.innerCardItems}>
            {order.bill_detail.map((item, i) => {
              return (
                <span key={i}>
                  <Card className={classes.cart}>
                    <CardMedia
                      className={classes.cover}
                      image={
                        foods.find((s) => s.id === item.food_id)?.img_url ||
                        DEFAULT_IMAGE + 200
                      }
                      title={foods.find((s) => s.id === item.food_id)?.name}
                    />
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Link to={"/product/" + item.product_id}>
                          <Typography
                            type="title"
                            component="h3"
                            className={classes.productTitle}
                            color="primary"
                          >
                            {foods.find((s) => s.id === item.food_id)?.name}
                          </Typography>
                        </Link>
                        <Typography
                          type="subheading"
                          component="h3"
                          className={classes.itemShop}
                          color="primary"
                        >
                          $ {foods.find((s) => s.id === item.food_id)?.price} x{" "}
                          {item.quantity}
                        </Typography>
                        <span className={classes.itemTotal}>
                          ${item.amount}
                        </span>
                        <span className={classes.itemShop}>
                          Shop:{" "}
                          {
                            restaurants.find(
                              (s) => s.id === order.restaurant_id
                            )?.name
                          }
                        </span>
                        <Typography
                          type="subheading"
                          component="h3"
                          color={
                            item.status == "Cancelled" ? "error" : "secondary"
                          }
                        >
                          Status: {item.status}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                  <Divider />
                </span>
              );
            })}
            <div className={classes.checkout}>
              <span className={classes.total}>Total: {order.total}</span>
            </div>
          </Card>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Card className={classes.innerCard}>
            <Typography
              type="subheading"
              component="h2"
              className={classes.productTitle}
              color="primary"
            >
              Deliver to:
            </Typography>
            <Typography
              type="subheading"
              component="h3"
              className={classes.info}
              color="primary"
            >
              <strong>{order.customer_name}</strong>
            </Typography>
            <br />
            <Typography
              type="subheading"
              component="h3"
              className={classes.info}
              color="primary"
            >
              {order.customer_email}
            </Typography>
            <Typography
              type="subheading"
              component="h3"
              className={classes.itemShop}
              color="primary"
            >
              {order.recipient_address}
            </Typography>
            <br />
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}

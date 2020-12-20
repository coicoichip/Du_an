import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Suggestions from "./../product/Suggestions";
import AddToCart from "./../cart/AddToCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useSelector, useDispatch } from "react-redux";
import { DEFAULT_IMAGE } from "../../config";
import { getFood, resetFoods } from "../../redux/foods";
import { getRestaurant, getRestaurants } from "../../redux/restaurants";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex: {
    display: "flex",
  },
  card: {
    padding: "24px 40px 40px",
  },
  subheading: {
    margin: "24px",
    color: theme.palette.openTitle,
  },
  price: {
    padding: "16px",
    margin: "16px 0px",
    display: "flex",
    backgroundColor: "#93c5ae3d",
    fontSize: "1.3em",
    color: "#375a53",
  },
  media: {
    height: 200,
    display: "inline-block",
    width: "50%",
    marginLeft: "24px",
  },
  icon: {
    verticalAlign: "sub",
  },
  link: {
    color: "#3e4c54b3",
    fontSize: "0.9em",
  },
  addCart: {
    width: "50px",
    height: "50px",
    padding: "10px 12px",
    borderRadius: "0.25em",
    backgroundColor: "#5f7c8b",
  },
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
}));

export default function Product({ match }) {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const restaurants = useSelector((s) => s.restaurants);
  const foods = useSelector((s) => s.foods);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getFood({ foodId: match.params.foodId, resId: match.params.resId })
    );
    dispatch(getRestaurants());
    return () => {
      dispatch(resetFoods());
    };
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={7} sm={7}>
          <Card className={classes.card}>
            <CardHeader
              title={foods.name}
              subheader={"In Stock"}
              action={
                <span className={classes.action}>
                  <AddToCart
                    cartStyle={classes.addCart}
                    food={foods[0]}
                    shop_name={
                      restaurants.find((r) => r.id === foods[0]?.restaurant_id)
                        ?.name
                    }
                  />
                </span>
              }
            />
            <div className={classes.flex}>
              <CardMedia
                className={classes.media}
                image={foods[0]?.img_url || DEFAULT_IMAGE + 200}
                title={foods[0]?.name}
              />
              <Typography
                component="p"
                variant="subtitle1"
                className={classes.subheading}
              >
                {foods[0]?.description}
                <br />
                <span className={classes.price}>$ {foods[0]?.price}</span>
                <Link
                  to={"/restaurants/" + foods[0]?.restaurant_id}
                  className={classes.link}
                >
                  <span>
                    <ShoppingBasketIcon className={classes.icon} />{" "}
                    {
                      restaurants.find((r) => r.id === foods[0]?.restaurant_id)
                        ?.name
                    }
                  </span>
                </Link>
              </Typography>
            </div>
          </Card>
        </Grid>
        {suggestions.length > 0 && (
          <Grid item xs={5} sm={5}>
            <Suggestions products={suggestions} title="Related Products" />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

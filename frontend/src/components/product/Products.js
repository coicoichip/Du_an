import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Link, useRouteMatch } from "react-router-dom";
import AddToCart from "./../cart/AddToCart";
import { DEFAULT_IMAGE } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, resetRestaurants } from "../../redux/restaurants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
    textAlign: "left",
    padding: "0 8px",
  },
  container: {
    minWidth: "100%",
    paddingBottom: "14px",
  },
  gridList: {
    width: "100%",
    minHeight: 200,
    padding: "16px 0 10px",
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    width: "100%",
  },
  tile: {
    textAlign: "center",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "rgb(189, 222, 219)",
    display: "block",
  },
}));

export default function Products({ foods, searched }) {
  const classes = useStyles();
  const restaurants = useSelector((s) => s.restaurants);
  const dispatch = useDispatch();
  const {
    params: { resId },
  } = useRouteMatch();
  useEffect(() => {
    dispatch(getRestaurants());
    return () => {
      dispatch(resetRestaurants());
    };
  }, []);
  return (
    <div className={classes.root}>
      {foods?.length > 0 ? (
        <div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {foods.map((food, i) => (
              <GridListTile key={i} className={classes.tile}>
                <Link to={"/food/" + resId + "/" + food.id}>
                  <img
                    className={classes.image}
                    src={food?.img_url || DEFAULT_IMAGE + 300}
                    alt={food.name}
                  />
                </Link>
                <GridListTileBar
                  className={classes.tileBar}
                  title={
                    <Link
                      to={"/food/" + resId + "/" + food.id}
                      className={classes.tileTitle}
                    >
                      {food.name}
                    </Link>
                  }
                  subtitle={<span>$ {food.price}</span>}
                  actionIcon={
                    <AddToCart
                      food={food}
                      shop_name={
                        restaurants.find(
                          (r) => r.id === food?.restaurant_id
                        )?.name
                      }
                    />
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        searched && (
          <Typography
            variant="subheading"
            component="h4"
            className={classes.title}
          >
            No products found! :(
          </Typography>
        )
      )}
    </div>
  );
}
Products.propTypes = {
  foods: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
};

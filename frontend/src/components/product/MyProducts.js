import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import DeleteProduct from "./../product/DeleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getFoodsByResId } from "../../redux/foods";
import { DEFAULT_AVATAR } from "../../config";

const useStyles = makeStyles((theme) => ({
  products: {
    padding: "24px",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  cover: {
    width: 110,
    height: 100,
    margin: "8px",
  },
  details: {
    padding: "10px",
  },
}));

export default function MyProducts(props) {
  const classes = useStyles();
  const foods = useSelector((s) => s.foods);
  const dispatch = useDispatch();
  const removeProduct = (productId) => {
    dispatch(deleteFood({ foodId: productId, resId: props.shopId }));
  };
  useEffect(() => {
    dispatch(getFoodsByResId({ resId: props.shopId }));
  }, []);
  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
        Foods
        <span className={classes.addButton}>
          <Link to={"/seller/" + props.shopId + "/foods/new"}>
            <Button color="primary" variant="contained">
              <AddBox className={classes.leftIcon} /> New Food
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {foods.map((product, i) => {
          return (
            <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.cover}
                  image={DEFAULT_AVATAR}
                  title={product.name}
                />
                <div className={classes.details}>
                  <Typography
                    type="headline"
                    component="h2"
                    color="primary"
                    className={classes.productTitle}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    type="subheading"
                    component="h4"
                    className={classes.subheading}
                  >
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link
                    to={"/seller/" + props.shopId + "/" + product.id + "/edit"}
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteProduct
                    product={product}
                    shopId={props.shopId}
                    onRemove={() => removeProduct(product.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          );
        })}
      </List>
    </Card>
  );
}
MyProducts.propTypes = {
  shopId: PropTypes.string.isRequired,
};

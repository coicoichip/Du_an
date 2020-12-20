import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import AddCartIcon from "@material-ui/icons/AddShoppingCart";
import DisabledCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/cart";
const useStyles = makeStyles((theme) => ({
  iconButton: {
    width: "28px",
    height: "28px",
  },
  disabledIconButton: {
    color: "#7f7563",
    width: "28px",
    height: "28px",
  },
}));

export default function AddToCart({ food, shop_name, cartStyle }) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const addToCart = () => {
    const xFactor = localStorage.getItem("resId");
    if (Number(xFactor) === Number(food.restaurant_id) || !xFactor) {
      dispatch(addItem({ item: { ...food, quantity: 1, shop_name } }));
      setRedirect({ redirect: true });
    } else {
      return <Redirect to={"/restaurants/" + xFactor} />;
    }
  };
  if (redirect) {
    return <Redirect to={"/cart"} />;
  }
  return (
    <span>
      {1 >= 0 ? (
        <IconButton color="secondary" dense="dense" onClick={addToCart}>
          <AddCartIcon className={cartStyle || classes.iconButton} />
        </IconButton>
      ) : (
        <IconButton disabled={true} color="secondary" dense="dense">
          <DisabledCartIcon
            className={cartStyle || classes.disabledIconButton}
          />
        </IconButton>
      )}
    </span>
  );
}

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  cartStyle: PropTypes.string,
};

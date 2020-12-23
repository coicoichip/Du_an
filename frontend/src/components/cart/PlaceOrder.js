import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBill } from "../../redux/bills";
import auth from "../../redux/auth";
import { resetCart } from "../../redux/cart";

const useStyles = makeStyles((theme) => ({
  subheading: {
    color: "rgba(88, 114, 128, 0.87)",
    marginTop: "20px",
  },
  checkout: {
    float: "right",
    margin: "20px 30px",
  },
  error: {
    display: "inline",
    padding: "0px 10px",
  },
  errorIcon: {
    verticalAlign: "middle",
  },
  StripeElement: {
    display: "block",
    margin: "24px 0 10px 10px",
    maxWidth: "408px",
    padding: "10px 14px",
    boxShadow:
      "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
    borderRadius: "4px",
    background: "white",
  },
}));

const PlaceOrder = ({ note }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    error: "",
    redirect: false,
    orderId: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((s) => s.cart);
  const auth = useSelector((s) => s.auth);
  const placeOrder = () => {
    dispatch(
      createBill({
        resId: localStorage.getItem("resId"),
        history,
        data: {
          bills: cart.map((s) => ({ food_id: s.id, quantity: s.quantity })),
          ship_price: 30,
          note,
          userId: auth.user_id
        },
      })
    );
    dispatch(resetCart());
  };

  if (values.redirect) {
    return <Redirect to={"/order/" + values.orderId} />;
  }
  return (
    <span>
      <div className={classes.checkout}>
        {values.error && (
          <Typography component="span" color="error" className={classes.error}>
            <Icon color="error" className={classes.errorIcon}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
        <Button color="secondary" variant="contained" onClick={placeOrder}>
          Place Order
        </Button>
      </div>
    </span>
  );
};
PlaceOrder.propTypes = {
  checkoutDetails: PropTypes.object.isRequired,
};

export default PlaceOrder;

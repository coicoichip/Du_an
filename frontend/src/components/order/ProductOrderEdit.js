import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getBill } from "../../redux/bills";
import { resetBillDetails } from "../../redux/billDetails";
import foods, {
  getFoods,
  getFoodsByResId,
  resetFoods,
} from "../../redux/foods";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0,
  },
  listImg: {
    width: "70px",
    verticalAlign: "top",
    marginRight: "10px",
  },
  listDetails: {
    display: "inline-block",
  },
  listQty: {
    margin: 0,
    fontSize: "0.9em",
    color: "#5f7c8b",
  },
  textField: {
    width: "160px",
    marginRight: "16px",
  },
  statusMessage: {
    position: "absolute",
    zIndex: "12",
    right: "5px",
    padding: "5px",
  },
}));
export default function ProductOrderEdit(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    open: 0,
    statusValues: [],
    error: "",
  });
  const dispatch = useDispatch();
  const order = useSelector((s) => s.billDetails);
  const foods = useSelector((s) => s.foods);
  useEffect(() => {
    dispatch(getBill({ resId: props.shopId, billId: props.order.id }));
    dispatch(getFoodsByResId({ resId: props.shopId }));
    return () => {
    };
  }, []);
  return (
    <div>
      <Typography
        component="span"
        color="error"
        className={classes.statusMessage}
      >
        {values.error}
      </Typography>
      <List disablePadding style={{ backgroundColor: "#f8f8f8" }}>
        {order?.bill_detail &&
          order.bill_detail.map((item, index) => {
            return (
              <span key={index}>
                {item.restaurant_id === props.resId && (
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      primary={
                        <div>
                          <img
                            className={classes.listImg}
                            src={foods.find((s) => s.id === item.food_id)?.img_url}
                            alt=""
                          />
                          <div className={classes.listDetails}>
                            {foods.find((s) => s.id === item.food_id)?.name}
                            <p className={classes.listQty}>
                              {"Quantity: " + item.quantity}
                            </p>
                          </div>
                        </div>
                      }
                    />
                    {/* <TextField
                      id="select-status"
                      select
                      label="Update Status"
                      className={classes.textField}
                      value={item.status}
                      onChange={handleStatusChange(index)}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {values.statusValues.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField> */}
                  </ListItem>
                )}
                <Divider style={{ margin: "auto", width: "80%" }} />
              </span>
            );
          })}
      </List>
    </div>
  );
}
ProductOrderEdit.propTypes = {
  shopId: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  orderIndex: PropTypes.number.isRequired,
  updateOrders: PropTypes.func.isRequired,
};

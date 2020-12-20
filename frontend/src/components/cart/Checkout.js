import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import PlaceOrder from "./PlaceOrder";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  card: {
    margin: "24px 0px",
    padding: "16px 40px 90px 40px",
    backgroundColor: "#80808017",
  },
  title: {
    margin: "24px 16px 8px 0px",
    color: theme.palette.openTitle,
  },
  subheading: {
    color: "rgba(88, 114, 128, 0.87)",
    marginTop: "20px",
  },
  addressField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%",
  },
  streetField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "93%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const user = useSelector((s) => s.auth);
  const [values, setValues] = useState({
    note: "",
    error: "",
  });

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Checkout
      </Typography>
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        value={user.name}
        margin="normal"
        disabled
      />
      <br />
      <TextField
        id="email"
        type="email"
        label="Email"
        className={classes.textField}
        value={user.email}
        margin="normal"
        disabled
      />
      <br />
      <TextField
        id="phone"
        type="phone"
        label="Phone"
        className={classes.textField}
        value={user.phone}
        margin="normal"
        disabled
      />
      <br />
      <TextField
        id="address"
        label="Address"
        className={classes.textField}
        value={user.address}
        margin="normal"
        disabled
      />
      <br />
      <TextField
            id="multiline-flexible"
            label="Note"
            multiline
            rows="4"
            value={values.note}
            onChange={(e) => setValues({...values, note: e.target.value})}
            className={classes.textField}
            margin="normal"
          /><br/>
      <br />{" "}
      {values.error && (
        <Typography component="p" color="error">
          <Icon color="error" className={classes.error}>
            error
          </Icon>
          {values.error}
        </Typography>
      )}
      <div>
        <PlaceOrder note={values.note} />
      </div>
    </Card>
  );
}

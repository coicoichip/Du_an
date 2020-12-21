import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import { FormControlLabel, Switch } from "@material-ui/core";
import { signup } from "../../redux/auth.js";
import { useDispatch } from "react-redux";
import { DEFAULT_AVATAR } from "../../config";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
}));

export default function Signup() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    position: "",
    phone: "",
    address: "",
    open: false,
    error: "",
  });
  const logoUrl = values.id
    ? `/api/restaurants/logo/${values.id}?${new Date().getTime()}`
    : DEFAULT_AVATAR;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleCheck = (event, checked) => {
    setValues({ ...values, position: checked });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      position: values.position ? "owner" : "customer" || undefined,
      phone: values.phone || undefined,
      address: values.address || undefined,
    };
    dispatch(signup({...user, history}));
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="phone"
            label="Phone"
            className={classes.textField}
            value={values.phone}
            onChange={handleChange("phone")}
            margin="normal"
          />
          <br />
          <TextField
            id="address"
            label="Address"
            className={classes.textField}
            value={values.address}
            onChange={handleChange("address")}
            margin="normal"
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />
          {/* <br />
          <Typography variant="subtitle1" className={classes.subheading}>
            Is Restaurant?
          </Typography>
          <FormControlLabel
            control={
              <Switch
                classes={{
                  checked: classes.checked,
                  bar: classes.bar,
                }}
                checked={values.position}
                onChange={handleCheck}
              />
            }
            label={values.seller ? "Active" : "Inactive"}
          /> */}
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

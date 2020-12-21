import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant } from "../../redux/restaurants";

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
    fontSize: "1em",
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
  filename: {
    marginLeft: "10px",
  },
}));

export default function NewShop() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    open_time: "",
    close_time: "",
    email: "",
    img_url: "",
    redirect: false,
    error: "",
  });
  const dispatch = useDispatch();
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const inputProps = {
    step: 60,
  };
  const clickSubmit = () => {
    dispatch(
      createRestaurant({
        data: {
          name: values.name,
          address: values.address,
          phone: values.phone,
          open_time: values.open_time,
          close_time: values.close_time,
          img_url: values.img_url,
          email: values.email,
        },
      })
    );
    setValues({ ...values, redirect: true });
  };

  if (values.redirect) {
    return <Redirect to={"/seller/restaurants"} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Shop
          </Typography>
          <br />
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
            id="img_url"
            label="Image Url"
            className={classes.textField}
            value={values.img_url}
            onChange={handleChange("img_url")}
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
            id="open_time"
            label="Opent Time"
            className={classes.textField}
            value={values.open_time}
            onChange={handleChange("open_time")}
            margin="normal"
            type="time"
            inputProps={inputProps}
          />
          <br />
          <TextField
            id="close_time"
            label="Clost Time"
            className={classes.textField}
            value={values.close_time}
            onChange={handleChange("close_time")}
            margin="normal"
            type="time"
            inputProps={inputProps}
          />
          <br />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
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
          <Link to="/seller/restaurants" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Error from "@material-ui/icons/Error";
import Avatar from "@material-ui/core/Avatar";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MyProducts from "./../product/MyProducts";
import { DEFAULT_AVATAR } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { editRestaurant } from "../../redux/restaurants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: "center",
    paddingBottom: theme.spacing(2),
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
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

export default function EditShop({ match }) {
  const classes = useStyles();
  const restaurants = useSelector(s => s.restaurants);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    image: "",
    address: "",
    phone: "",
    open_time: "",
    close_time: "",
    email: "",
    redirect: false,
    error: "",
    id: "",
  });
  const resId = match.params.resId;

  const clickSubmit = () => {
    dispatch(
      editRestaurant({
        resId,
        data: {
          name: values.name,
          address: values.address,
          phone: values.phone,
          open_time: values.open_time,
          close_time: values.close_time,
          email: values.email,
        },
      })
    );
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  useEffect(() => {
  })
  const logoUrl = DEFAULT_AVATAR + resId;
  if (values.redirect) {
    return <Redirect to={"/seller/restaurants"} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                Edit Shop
              </Typography>
              <br />
              <Avatar src={logoUrl} className={classes.bigAvatar} />
              <br />
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
              />
              <br />
              <TextField
                id="close_time"
                label="Clost Time"
                className={classes.textField}
                value={values.close_time}
                onChange={handleChange("close_time")}
                margin="normal"
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
                  <Error color="error" className={classes.error} />
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
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <MyProducts shopId={match.params.resId} />
        </Grid>
      </Grid>
    </div>
  );
}

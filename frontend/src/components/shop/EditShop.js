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
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: "",
    id: "",
  });

  const clickSubmit = () => {
    let shopData = new FormData();
    values.name && shopData.append("name", values.name);
    values.description && shopData.append("description", values.description);
    values.image && shopData.append("image", values.image);
  };
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const logoUrl = values.id
    ? `/api/restaurants/logo/${values.id}?${new Date().getTime()}`
    : "/api/restaurants/defaultphoto";
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
          <MyProducts shopId={match.params.shopId} />
        </Grid>
      </Grid>
    </div>
  );
}

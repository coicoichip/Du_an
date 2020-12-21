import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../config";
import { editFood, getFood, resetFoods } from "../../redux/foods";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
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

export default function EditProduct({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    img_url: "",
    price: "",
    redirect: false,
    error: "",
  });
  const dispatch = useDispatch();
  const foods = useSelector((s) => s.foods);
  const clickSubmit = () => {
    dispatch(
      editFood({
        foodId: match.params.foodId,
        resId: match.params.resId,
        data: {
          name: values.name,
          description: values.description,
          img_url: values.img_url,
          price: values.price,
        },
      })
    );
    setValues({ ...values, redirect: true });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  useEffect(() => {
    dispatch(
      getFood({ foodId: match.params.foodId, resId: match.params.resId })
    );
    return () => {
      dispatch(resetFoods());
    };
  }, []);
  useEffect(() => {
    setValues({
      ...values,
      name: foods[0].name,
      description: foods[0].description,
      img_url: foods[0].img_url,
      price: foods[0].price,
    });
  }, [foods]);
  if (values.redirect) {
    return <Redirect to={"/seller/restaurant/edit/" + match.params.resId} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Food
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
            id="price"
            label="Price"
            className={classes.textField}
            value={values.price}
            onChange={handleChange("price")}
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
            id="description"
            label="Description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            margin="normal"
          />
          <br />
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
            Update
          </Button>
          <Link
            to={"/seller/restaurant/edit/" + match.params.resId}
            className={classes.submit}
          >
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

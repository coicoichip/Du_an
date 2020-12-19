import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Products from "./../product/Products";
import Comments from "./Comments.js";
import { DEFAULT_AVATAR } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../../redux/foods.js";
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
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "auto",
  },
  productTitle: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      1
    )}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: "100%",
    fontSize: "1.2em",
  },
}));

export default function Shop({ match }) {
  const classes = useStyles();
  const [shop, setShop] = useState("");
  const [error, setError] = useState("");
  const foods = useSelector(s => s.foods)
  const dispatch = useDispatch();
  const shopId = match.params.shopId;
  useEffect(() => {
    dispatch(getFoods());
  }, [shopId]);

  const logoUrl = DEFAULT_AVATAR + shopId;
  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                {shop.name}
              </Typography>
              <br />
              <Avatar src={logoUrl} className={classes.bigAvatar} />
              <br />
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {shop.description}
              </Typography>
              <br />
            </CardContent>
          </Card>
          <Comments postId={1} comments={[]} updateComments={null} />
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography
              type="title"
              component="h2"
              className={classes.productTitle}
            >
              Foods
            </Typography>
            <Products foods={foods} searched={false} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

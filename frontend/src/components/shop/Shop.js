import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Products from "./../product/Products";
import Comments from "./Comments.js";
import { BASE_URL, DEFAULT_AVATAR } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getFoodsByResId, resetFoods } from "../../redux/foods.js";
import { getRestaurant, resetRestaurants } from "../../redux/restaurants.js";
import { getComments, resetComments } from "../../redux/comments";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarBorder from "@material-ui/icons/StarBorder";
import { notifyErrorMsg, notifySuccess } from "../../redux/Alert";
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
  const [error, setError] = useState("");
  const [resStar, setResStar] = useState(0);
  const [rates, setRates] = useState([]);
  const [showRate, setShowRate] = useState(false);
  const foods = useSelector((s) => s.foods);
  const auth = useSelector((s) => s.auth);
  const restaurants = useSelector((s) => s.restaurants);
  const dispatch = useDispatch();
  const resId = match.params.resId;
  const handleHover = (index) => {
    setResStar(index);
  };
  const vote = () => {
    axios({
      url: `${BASE_URL}/restaurants/${resId}/rates`,
      method: "POST",
      withCredentials: true,
      data: {
        star: resStar,
      },
    })
      .then(() => {
        setShowRate(false);
        notifySuccess("Đánh giá thành công.");
      })
      .catch((err) => notifyErrorMsg(err));
  };
  useEffect(() => {
    dispatch(getFoodsByResId({ resId: resId }));
    dispatch(getRestaurant({ resId: resId }));
    dispatch(getComments({ resId: resId }));
    axios({
      url: `${BASE_URL}/restaurants/${resId}/rates`,
      method: "GET",
      withCredentials: true,
    }).then(
      ({
        data: {
          data: { rates, avg },
        },
      }) => {
        setResStar(avg);
        setRates(rates);
      }
    );
    return () => {
      dispatch(resetFoods());
      dispatch(resetRestaurants());
      dispatch(resetComments());
    };
  }, [resId]);
  useEffect(() => {
    if (!rates.find((r) => r.email === auth.email)) setShowRate(true);
    else setShowRate(false);
  }, [rates]);

  const logoUrl = DEFAULT_AVATAR + resId;
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
                {restaurants[0]?.name}
              </Typography>
              <Avatar
                src={restaurants[0]?.img_url}
                className={classes.bigAvatar}
              />
              <br />
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {restaurants[0]?.email}
              </Typography>
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {restaurants[0]?.address}
              </Typography>
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {restaurants[0]?.open_time} - {restaurants[0]?.close_time}
              </Typography>
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {restaurants[0]?.description}
              </Typography>
              {showRate && (
                <Grid container>
                  <div className="ml-auto mr-auto mt-4">
                    {[1, 2, 3, 4, 5].map((i) =>
                      i <= resStar ? (
                        <StarIcon
                          onMouseOver={() => handleHover(i)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <StarBorder
                          style={{ cursor: "pointer" }}
                          onMouseOver={() => handleHover(i)}
                        />
                      )
                    )}
                  </div>
                </Grid>
              )}
              {showRate && (
                <div
                  className="ml-auto mr-auto"
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={vote}
                >
                  Vote
                </div>
              )}
              <br />
            </CardContent>
          </Card>
          <Comments shopId={resId} updateComments={null} />
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

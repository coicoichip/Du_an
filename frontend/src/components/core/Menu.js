import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useDispatch, useSelector } from "react-redux";
import { signout, WHO_AM_I } from "../../redux/auth";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const Menu = withRouter(({ history }) => {
  const auth = useSelector((s) => s.auth);
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/"><span style={{color: "white"}}>Get Food</span></Link>
        </Typography>
        <div>
          <Link to="/restaurants/all" className="ml-4">
            <Button style={isActive(history, "/restaurants/all")}>
              All Restaurants
            </Button>
          </Link>
          <Link to="/cart" className="ml-4">
            <Button style={isActive(history, "/cart")}>
              Cart
              <Badge
                color="secondary"
                invisible={false}
                badgeContent={cart.length}
                style={{ marginLeft: "7px" }}
              >
                <CartIcon />
              </Badge>
            </Button>
          </Link>
        </div>
        <div style={{ position: "absolute", right: "10px" }}>
          <span style={{ float: "right" }}>
            {!auth.email && (
              <span>
                <Link to="/signup">
                  <Button style={isActive(history, "/signup")}>Sign up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive(history, "/signin")}>Sign In</Button>
                </Link>
              </span>
            )}
            {auth.email && (
              <span>
                {auth.position === "owner" && (
                  <Link to="/seller/restaurants">
                    <Button style={isPartActive(history, "/seller/")}>
                      My Restaurants
                    </Button>
                  </Link>
                )}
                <Link to={"/user/user_id"}>
                  <Button style={isActive(history, "/user/user_id")}>
                    My Profile
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  onClick={() => {
                    dispatch(signout());
                  }}
                >
                  Sign out
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;

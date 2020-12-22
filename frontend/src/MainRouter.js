import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/core/Home";
import Users from "./components/user/Users";
import Signup from "./components/user/Signup";
import Signin from "./components/auth/Signin";
import EditProfile from "./components/user/EditProfile";
import Profile from "./components/user/Profile";
import Menu from "./components/core/Menu";
import NewShop from "./components/shop/NewShop";
import Shops from "./components/shop/Shops";
import MyShops from "./components/shop/MyShops";
import Shop from "./components/shop/Shop";
import EditShop from "./components/shop/EditShop";
import NewProduct from "./components/product/NewProduct";
import EditProduct from "./components/product/EditProduct";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import StripeConnect from "./components/user/StripeConnect";
import ShopOrders from "./components/order/ShopOrders";
import Order from "./components/order/Order";
import { useDispatch } from "react-redux";
import { WHO_AM_I } from "./redux/auth";

const MainRouter = () => {
  const dispatch = useDispatch();
  const login = localStorage.getItem("login");
  console.log(login);
  useEffect(() => {
    dispatch({ type: WHO_AM_I });
    localStorage.removeItem("resId");
  }, []);
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Shops} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route
          login={login}
          path="/user/edit/:userId"
          component={EditProfile}
        />
        <Route path="/user/:userId" component={Profile} />

        <Route path="/cart" component={Cart} />
        <Route path="/food/:resId/:foodId" component={Product} />
        <Route path="/restaurants/all" component={Shops} />
        <Route path="/restaurants/:resId" component={Shop} />

        <Route path="/order/:orderId" component={Order} />
        <Route
          login={login}
          path="/seller/orders/:shop/:resId"
          component={ShopOrders}
        />

        <Route path="/seller/restaurants" component={MyShops} />
        <Route
          login={login}
          path="/seller/restaurant/new"
          component={NewShop}
        />
        <Route
          login={login}
          path="/seller/restaurant/edit/:resId"
          component={EditShop}
        />
        <Route
          login={login}
          path="/seller/:resId/foods/new"
          component={NewProduct}
        />
        <Route
          login={login}
          path="/seller/:resId/:foodId/edit"
          component={EditProduct}
        />
        <Route path="/seller/stripe/connect" component={StripeConnect} />
      </Switch>
    </div>
  );
};

export default MainRouter;

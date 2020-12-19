import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/core/Home'
import Users from './components/user/Users'
import Signup from './components/user/Signup'
import Signin from './components/auth/Signin'
import EditProfile from './components/user/EditProfile'
import Profile from './components/user/Profile'
import PrivateRoute from './components/auth/PrivateRoute'
import Menu from './components/core/Menu'
import NewShop from './components/shop/NewShop'
import Shops from './components/shop/Shops'
import MyShops from './components/shop/MyShops'
import Shop from './components/shop/Shop'
import EditShop from './components/shop/EditShop'
import NewProduct from './components/product/NewProduct'
import EditProduct from './components/product/EditProduct'
import Product from './components/product/Product'
import Cart from './components/cart/Cart'
import StripeConnect from './components/user/StripeConnect'
import ShopOrders from './components/order/ShopOrders'
import Order from './components/order/Order'

const MainRouter = () => {
  return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <Route path="/cart" component={Cart}/>
        <Route path="/food/:productId" component={Product}/>
        <Route path="/restaurants/all" component={Shops}/>
        <Route path="/restaurants/:resId" component={Shop}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/seller/orders/:shop/:resId" component={ShopOrders}/>

        <PrivateRoute path="/seller/restaurants" component={MyShops}/>
        <PrivateRoute path="/seller/restaurant/new" component={NewShop}/>
        <PrivateRoute path="/seller/restaurant/edit/:resId" component={EditShop}/>
        <PrivateRoute path="/seller/:resId/foods/new" component={NewProduct}/>
        <PrivateRoute path="/seller/:resId/:productId/edit" component={EditProduct}/>

        <Route path="/seller/stripe/connect" component={StripeConnect}/>
      </Switch>
    </div>)
}

export default MainRouter

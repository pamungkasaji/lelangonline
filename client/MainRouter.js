import React from 'react'
import {Route, Switch} from 'react-router-dom'
// import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import MyAuctions from './auction/MyAuctions'
import OpenAuctions from './auction/OpenAuctions'
import NewAuction from './auction/NewAuction'
import EditAuction from './auction/EditAuction'
import Auction from './auction/Auction'
import SignupSeller from './user/SignupSeller'

const MainRouter = () => {
  return (<div>
      <Menu/>
      <Switch>
        {/* <Route exact path="/" component={Home}/> */}
        <Route exact path="/" component={OpenAuctions}/>

        <PrivateRoute path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signupseller" component={SignupSeller}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <PrivateRoute path="/myauctions" component={MyAuctions}/>
        <PrivateRoute path="/auction/new" component={NewAuction}/>
        <PrivateRoute path="/auction/edit/:auctionId" component={EditAuction}/>
        <Route path="/auction/:auctionId" component={Auction}/>
        <Route path="/auctions/all" component={OpenAuctions}/>
      </Switch>
    </div>)
}

export default MainRouter

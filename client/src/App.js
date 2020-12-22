import PrivateRouteAdmin from './components/routing/PrivateRouteAdmin'
import PrivateRouteUser from './components/routing/PrivateRouteUser'

import Navbar from  './components/layout/Navbar';
import Search from  './components/search/Search';
import About from  './components/page/About';
import Home from  './components/page/Home';
import View from  './components/page/View';
import View_all from  './components/page/View_all';

import './style.css';

import Admin_Login from './components/admin/Admin_Login';
import Admin_Dashboard from './components/admin/Admin_Dashboard';
import Ad_list from './components/admin/Ad_list';
import Category_add from './components/admin/Category_add';
import City_add from './components/admin/City_add';

import UserSignUp from './components/user/UserSignUp'
import UserLogin from './components/user/UserLogin'
import UserDashboard from './components/user/UserDashboard'
import UserAdList from './components/user/UserAdList';
import UserAdAdd from './components/user/UserAdAdd';

import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store} >
      
      <Router>
        <Navbar />
        <div className="container" style={{ padding:"40px" }} >

            <Switch>
              
              <Route exact path='/search' >
                <Search />
              </Route>

              <Route exact  path='/about' >
                <About />
              </Route>

              <Route exact path='/view/:id' >
                <View />
              </Route>

              <Route exact path='/view/' >
                <View />
              </Route>

              <Route exact path='/view_all/' >
                <View_all />
              </Route>

              <Route exact  path='/admin/login/' >
                <Admin_Login />
              </Route>
              
              <Route exact path='/admin/dashboard' >
                <PrivateRouteAdmin><Admin_Dashboard /></PrivateRouteAdmin>
              </Route>

              <Route exact path='/admin/ad_list' >
                <PrivateRouteAdmin><Ad_list /></PrivateRouteAdmin>
              </Route>

              <Route exact path='/admin/category_add' >
                <PrivateRouteAdmin><Category_add /></PrivateRouteAdmin>
              </Route>

              <Route exact path='/admin/city_add' >
                <PrivateRouteAdmin><City_add /></PrivateRouteAdmin>
              </Route>

              <Route exact path='/user/signup' >
                <UserSignUp />
              </Route>

              <Route exact path='/user/login' >
                <UserLogin />
              </Route>

              <Route exact path='/user/dashboard' >
                <PrivateRouteUser><UserDashboard /></PrivateRouteUser>
              </Route>

              <Route exact path='/user/ad_list' >
                <PrivateRouteUser><UserAdList /></PrivateRouteUser>
              </Route>

              <Route exact path='/user/ad_add' >
                <PrivateRouteUser><UserAdAdd /></PrivateRouteUser>
              </Route>

              <Route exact path='/' >
                <Home />
              </Route>

            </Switch>
          
        </div>
      </Router>

    </Provider>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import ReactNotifications from "react-notifications-component";
import { CookiesProvider } from 'react-cookie';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-notifications-component/dist/theme.css'

import LoginRegister from './Pages/LoginRegister';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import Profile from './Pages/Profile';

const FindProfile = () => {
  const { id } = useParams();
  return <Profile id={id} />;
}

ReactDOM.render(
  <React.StrictMode>
    <ReactNotifications />
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact>
            <LoginRegister login={true} />
          </Route>
          <Route path='/register' exact>
            <LoginRegister register={true} />
          </Route>
          <Route path='/search' exact>
            <SearchPage case='All' />
          </Route>
          <Route path='/favourites' exact>
            <SearchPage case='Favourite' />
          </Route>
          <Route path='/my' exact>
            <SearchPage case='My' />
          </Route>
          <Route path='/users/:id'>
            <FindProfile />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

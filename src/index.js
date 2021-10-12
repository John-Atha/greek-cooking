import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Switch, Route, useParams } from 'react-router-dom';
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
import OneRecipe from './Pages/OneRecipe';
import UploadPage from './Pages/UploadPage';

const FindProfile = () => {
  const { id } = useParams();
  return <Profile id={id} />;
}

const FindRecipe = () => {
  const { id } = useParams();
  return <OneRecipe id={id} />;
}

ReactDOM.render(
  <React.StrictMode>
    <ReactNotifications />
    <CookiesProvider>
      <HashRouter basename={'/greek-cooking'}>
        <Switch>
          <Route path='/greek-cooking/login' exact>
            <LoginRegister login={true} />
          </Route>
          <Route path='/greek-cooking/register' exact>
            <LoginRegister register={true} />
          </Route>
          <Route path='/greek-cooking/search' exact>
            <SearchPage case='All' />
          </Route>
          <Route path='/greek-cooking/favourites' exact>
            <SearchPage case='Favourite' />
          </Route>
          <Route path='/greek-cooking/my' exact>
            <SearchPage case='My' />
          </Route>
          <Route path='/greek-cooking/users/:id'>
            <FindProfile />
          </Route>
          <Route path='/greek-cooking/recipes/:id'>
            <FindRecipe />
          </Route>
          <Route path='/greek-cooking/upload'>
            <UploadPage />
          </Route>
          <Route path='/greek-cooking' exact>
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

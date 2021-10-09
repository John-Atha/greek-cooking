import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { CookiesProvider } from 'react-cookie';
import LoginRegister from './Pages/LoginRegister';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact>
            <LoginRegister login={true} />
          </Route>
          <Route path='/register' exact>
            <LoginRegister register={true} />
          </Route>
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

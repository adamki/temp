import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginContainer from './views/login/LoginContainer';
import DashboardContainer from './views/dashboard/DashboardContainer';

import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginContainer} />
      <Route path="/addresses/:id" component={DashboardContainer} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

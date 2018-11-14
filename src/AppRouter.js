import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage'
import Login from './Login'
import AppCms from './AppCms'


const AppRouter = () => (
    <div className="app-routes">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/cms" component={AppCms} />
      </Switch>
    </div>
  );

export default AppRouter;
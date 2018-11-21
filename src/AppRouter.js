import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage'
import Login from './Login'
import AppCms from './AppCms'
import AnggotaDetail from './AnggotaDetail'
import AnggotaAll from './anggota/AnggotaAll'
import AnggotaDet from './anggota/AnggotaDet'

const AppRouter = () => (
    <div className="app-routes">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path='/:angId' component={AnggotaDetail} />
        </Switch>
        <Switch>
          <Route exact path='/anggota' component={AnggotaAll} />
          <Route path='/anggota/:angId' component={AnggotaDet} />
        </Switch>
        <Route path="/login" component={Login} />
        <Route path="/cms" component={AppCms} />
    </div>
  );

export default AppRouter;
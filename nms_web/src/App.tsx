import React, { ReactNode } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from "./views/Login/login";
import NEWS from "./views/News";
import './App.css';


const App = () => {
  const token: string | null = sessionStorage.getItem('token');
  return (
      <Router>
        <Switch>
          <Route path='/login' component={LOGIN} />
          <Route path='/news' component={NEWS} />
          <Route path='/' render={(): ReactNode => {
            return token ? <NEWS /> : <Redirect to="/login" />;
          }} />
        </Switch>
      </Router>

  );
}

export default App;

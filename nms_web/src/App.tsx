import React, { ReactNode } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from "./views/Login";
import NEWS from "./views/News";
import './App.css';


const App = () => {
  const token: string | null = localStorage.getItem('token');
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/login' component={LOGIN} />
          <Route path='/' render={(): ReactNode => {
            console.log(token);
            return token ? <NEWS /> : <Redirect to="/login" />;
          }} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;

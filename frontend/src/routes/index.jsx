import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useAuth } from "src/hooks/useAuth";

import { Header } from "src/common/Header";

import { Login } from "src/components/Login";
import { Signup } from "src/components/Signup";
import { NotFound } from "src/components/NotFound";
import { ProjectsList } from "src/components/ProjectsList";
import { TaskList } from "src/components/TaskList";

export const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        {isAuthenticated && (
          <Fragment>
            <Header />
            <Route exact path="/projects" component={ProjectsList} />
            <Route path="/projects/:id" component={TaskList} />
          </Fragment>
        )}

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

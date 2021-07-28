import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from '../components/Home'
import ProjectForm from "./projects/ProjectForm";
import ProjectDetails from "./projects/ProjectDetails";
import ProjectStepForm from "./projectStep/ProjectStepForm";


const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/project/add" exact>
          {isLoggedIn ? <ProjectForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/project/:id" exact>
          {isLoggedIn ? <ProjectStepForm /> : <Redirect to="/login" />}
        </Route>

        
        <Route path="/project/details/:id" exact>
          {isLoggedIn ? <ProjectDetails /> : <Redirect to="/login" />}
        </Route>

      <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
    </Switch>
  );
};

export default ApplicationViews;
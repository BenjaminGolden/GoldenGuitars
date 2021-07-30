import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from '../components/Home'
import ProjectForm from "./projects/ProjectForm";
import ProjectDetails from "./projects/ProjectDetails";
import StepNotesList from "./stepNotes/StepNotesList";
import ProjectNotesList from "./projectNotes/ProjectNotesList";
import ProjectNoteEditForm from "./projectNotes/ProjectNotesEditForm";




const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/project/add" exact>
          {isLoggedIn ? <ProjectForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/project/:id/stepNotes/:id" exact>
          {isLoggedIn ? <StepNotesList /> : <Redirect to="/login" />}
        </Route>

        
        <Route path="/project/details/:id" exact>
          {isLoggedIn ? <ProjectDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/projectNotes/:id" exact>
          {isLoggedIn ? <ProjectNotesList /> : <Redirect to="/login" />}
        </Route>

        
        <Route path="/projectNote/edit/:id" exact>
          {isLoggedIn ? <ProjectNoteEditForm/> : <Redirect to="/login" />}
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
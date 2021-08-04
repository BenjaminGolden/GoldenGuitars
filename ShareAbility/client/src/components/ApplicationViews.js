import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from '../components/Home'
import ProjectForm from "./projects/ProjectForm";
import ProjectDetails from "./projects/ProjectDetails";
import StepNotesList from "./stepNotes/StepNotesList";
import ProjectNotesList from "./projectNotes/ProjectNotesList";
import ProjectNoteEditForm from "./projectNotes/ProjectNotesEditForm";
import ProjectStepNoteEditForm from "./stepNotes/StepNotesEditForm";
import ProjectEditForm from "./projects/ProjectEditForm";
import { getCurrentUser } from "../modules/authManager";




const ApplicationViews = ({ isLoggedIn }) => {
const [user, setUser] = useState({});

const getUser = () => {
  getCurrentUser()
  .then(response => setUser(response))
}

useEffect(() => {
  getUser();
}, []);

  return (
    <Switch>

      <Route path="/" exact>
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>

      <Route path="/project/add" exact>
        {isLoggedIn ? <ProjectForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/project/edit/:id" exact>
        {isLoggedIn ? <ProjectEditForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/projectStepNotes/:id" exact>
        {isLoggedIn ? <StepNotesList user={user}/> : <Redirect to="/login" />}
      </Route>

      <Route path="/project/details/:id" exact>
        {isLoggedIn ? <ProjectDetails /> : <Redirect to="/login" />}
      </Route>

      <Route path="/projectNotes/:id" exact>
        {isLoggedIn ? <ProjectNotesList user={user}/> : <Redirect to="/login" />}
      </Route>

      <Route path="/projectNote/edit/:id" exact>
        {isLoggedIn ? <ProjectNoteEditForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/projectStepNote/edit/:id" exact>
        {isLoggedIn ? <ProjectStepNoteEditForm /> : <Redirect to="/login" />}
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
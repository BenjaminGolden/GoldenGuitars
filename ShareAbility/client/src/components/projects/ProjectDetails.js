import React from "react";
import { Card, CardBody, FormGroup, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProjectById, deleteProject } from "../../modules/projectManager";
import { getAllProjectSteps } from "../../modules/projectStepManager";
import { getAllProjectNotesbyProjectId, addProjectNote } from "../../modules/projectNotesManager";
import ProjectStepForm from "../projectStep/ProjectStepForm";


const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState({});
    const [projectStep, setProjectStep] = useState([]);
    const [showProjectNotesForm, setShowProjectNotesForm] = useState(false);
    const { id } = useParams();
    const [newProjectNote, setNewProjectNote] = useState({
        projectId: id,
        content: ''
    })

    const history = useHistory();
//get project details
    const getProjectDetails = () => {
        getProjectById(id)
            .then(setProjectDetails)
    }
//get all project steps
    const getProjectSteps = () => {
        return getAllProjectSteps(id)
            .then(projectStepsFromAPI => {
                setProjectStep(projectStepsFromAPI)

            })
    }
//start date display function
    const handleStartDate = () => {
        let date = new Date(projectDetails.startDate).toDateString();
        return date;
    };

    //handle change for project note
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const newProjectNoteCopy = { ...newProjectNote };

        newProjectNoteCopy[key] = value;
        setNewProjectNote(newProjectNoteCopy);
    };

    //SAVE project note
    const handleSubmit = (event) => {
        event.preventDefault();
        addProjectNote(newProjectNote)
            .then(history.push(`/projectNotes/${id}`))
    }

    //DELETE PROJECT
    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this project?")) {
            deleteProject(projectDetails.id)
            .then(history.push("/"));

        }

    };

    //Project Notes Toggle
    const projectNotesToggle = () => setShowProjectNotesForm(!showProjectNotesForm)

    // const handleCompletionDate = () => {
    //     let completionDate = new Date(projectDetails.completionDate).toDateString();
    //     if (completionDate === null)
    //     {
    //         return "project not complete"
    //     }
    //     else
    //     {
    //     return completionDate;
    //     }
    // }

    useEffect(() => {
        getProjectDetails();
        getProjectSteps();
    }, []);

    return (
        <>
            <h2 className="text-center">Details </h2>
                <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Home</Button>
            <Card className="">
                <CardBody>

                    <p><b>Name: </b>{projectDetails.name}</p>
                    <p><b>StartDate: </b>{handleStartDate()}</p>
                    <p><b>CompletionDate: </b>{projectDetails.completionDate}</p>
                    
                    <Button className="btn btn-primary" onClick={projectNotesToggle}>
                    {showProjectNotesForm ? 'Cancel' : 'Add a project Note'}</Button>
                    <Button className="btn btn-primary" onClick={() => history.push(`/projectNotes/${projectDetails.id}`)}>View Project Notes</Button>

                    {/* Add Project Note Toggle     */}
                    {showProjectNotesForm &&
                        <>
                            <FormGroup>
                                <Input type="textarea" row="4" col="100" name="content" id="content" placeholder="add a note to this project"
                                    value={newProjectNote.content}
                                    onChange={handleInputChange} />
                            </FormGroup>

                            <Button className="btn btn-primary" onClick={handleSubmit}>Save note</Button>
                        </>
                    }
                    <p>{ProjectStepForm()}</p>
                </CardBody>
            </Card >

            <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                <Link to={`/project/edit/${projectDetails.id}`}>
                    <Button className="btn btn-info">Edit Project</Button>
                </Link>
        </>
    );
};

export default ProjectDetails;

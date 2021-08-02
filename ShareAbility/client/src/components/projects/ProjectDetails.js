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
            .then(() => history.push(`/projectNotes/${id}`))
    }

    //DELETE PROJECT
    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this project?")) {
            deleteProject(projectDetails.id)
                .then(() => history.push("/"));
        }
    };

    //Project Notes Toggle
    const projectNotesToggle = () => setShowProjectNotesForm(!showProjectNotesForm)

    //start date display function
    const handleStartDate = () => {
        let date = new Date(projectDetails.startDate).toDateString();

        return date;
    };

    //handle completionDate
    const handleCompletionDate = () => {
        let completionDate = new Date(projectDetails.completionDate).toDateString();

        if (projectDetails.completionDate === null) {
            return <p>"project hasn't been completed"</p>
        }
        return completionDate;

    }

    useEffect(() => {
        getProjectDetails();
        getProjectSteps();
    }, []);

    return (
        <>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Home</Button>
            <Card className="">
                <CardBody>
                    <h2 className="text-center">Details </h2>

                    <p><b>Name: </b>{projectDetails.name}</p>
                    <p><b>StartDate: </b>{handleStartDate()}</p>
                    <p><b>CompletionDate: </b>{handleCompletionDate()}</p>

                    <Button className="btn btn-primary m-3" onClick={projectNotesToggle}>
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
                    <Link to={`/project/edit/${projectDetails.id}`}>
                        <Button className="btn btn-info m-6">Edit Project</Button>
                    </Link>
                    <Button className="btn btn-danger m-3" onClick={handleDelete}>Delete Project</Button>
                </CardBody>
            </Card >

        </>
    );
};

export default ProjectDetails;

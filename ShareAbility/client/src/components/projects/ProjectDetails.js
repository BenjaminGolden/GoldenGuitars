import React from "react";
import { Card, CardBody, FormGroup, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getProjectById } from "../../modules/projectManager";
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

    const getProjectDetails = () => {
        getProjectById(id)
            .then(setProjectDetails)
    }

    const getProjectSteps = () => {
        return getAllProjectSteps(id)
            .then(projectStepsFromAPI => {
                setProjectStep(projectStepsFromAPI)

            })
    }

    const handleStartDate = () => {
        let date = new Date(projectDetails.startDate).toDateString();
        return date;
    };

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const newProjectNoteCopy = { ...newProjectNote };

        newProjectNoteCopy[key] = value;
        setNewProjectNote(newProjectNoteCopy);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addProjectNote(newProjectNote)
            .then(history.push(`/projectNotes/${id}`))
    }

    const toggle = () => setShowProjectNotesForm(!showProjectNotesForm)


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
            <Card className="w-75 mx-auto">
                <CardBody>

                    <p><b>Name: </b>{projectDetails.name}</p>
                    <p><b>StartDate: </b>{handleStartDate()}</p>
                    <p><b>CompletionDate: </b>{projectDetails.completionDate}</p>
                    <Button className="btn btn-primary" onClick={toggle}>{showProjectNotesForm ? 'Cancel' : 'Add a project Note'}</Button>
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
        </>
    );
};

export default ProjectDetails;

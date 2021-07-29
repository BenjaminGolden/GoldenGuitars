import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProjectById } from "../../modules/projectManager";
import { Link } from "react-router-dom";
import { getAllProjectSteps } from "../../modules/projectStepManager";
import ProjectStepForm from "../projectStep/ProjectStepForm";


const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState({});
    const [projectStep, setProjectStep] = useState([]);
    const { id } = useParams();

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
                <p>{ProjectStepForm()}</p>
            </CardBody>
        </Card >
        </>
    );
};

export default ProjectDetails;
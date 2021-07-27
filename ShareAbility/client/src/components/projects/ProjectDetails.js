import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProjectById } from "../../modules/projectManager";
import { Link } from "react-router-dom";



const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState({});
    const { id } = useParams();

    const getProjectDetails = () => {
        getProjectById(id)
            .then(setProjectDetails)
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
    }, []);

    return (
        <>
        <h2 className="text-center">Details </h2>
        <Card className="w-75 mx-auto">
            <CardBody>
                
                <p><b>Name: </b>{projectDetails.name}</p>
                <p><b>StartDate: </b>{handleStartDate()}</p>
                <p><b>CompletionDate: </b>{projectDetails.completionDate}</p>
                <p><b>Steps: </b>{projectDetails?.steps?.Name}</p>
                <p><b>Status: </b>{projectDetails?.status?.Name}</p>
                {/* <Link to={`/comment/ProjectId/${projectDetails.id}`}>
                    <Button className="btn btn-primary">View Comments</Button>
                </Link>
                <Link to={`/comment/add/${projectDetails.id}`}>
                    <Button className="btn btn-success">Add Comment</Button>
                </Link> */}
            </CardBody>
        </Card >
        </>
    );
};

export default ProjectDetails;
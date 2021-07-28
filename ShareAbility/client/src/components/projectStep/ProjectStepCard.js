import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { getAllStatuses } from "../../modules/statusManager";
import { getAllSteps } from "../../modules/stepsManager";


const ProjectStep = () => {

    const [newProjectStep, setNewProjectStep] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [steps, setSteps] = useState([]);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectStepCopy = { ...newProjectStep };

        projectStepCopy[key] = value;
        setNewProjectStep(projectStepCopy);

    };

    const getUsers = () => {
        return getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
            })
    }

    const getStatuses = () => {
        return getAllStatuses()
            .then(statusesFromAPI => {
                setStatus(statusesFromAPI)
            })
    }

    const getSteps = () => {
        return getAllSteps()
            .then(StepsFromAPI => {
                setSteps(StepsFromAPI)

            })
    }

    useEffect(() => {
        getUsers();
        getStatuses();
        getSteps();
    }, []);

    return (

        <>
            <Card className="m-2 p-2 w-50 mx-auto">
                <CardBody className="m-3">

                    <div>
                    <p>{steps.name}</p>
                    <select value={newProjectStep.stepsId} name="step" id="step" onChange={handleInputChange} className='form-control'>
                        <option value="0">Select a Worker</option>
                        {users.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    </div>           
                    <p>{status.name}</p>

                    <select value={newProjectStep.statusId} name="status" id="status" onChange={handleInputChange} className='form-control'>
                        <option value="0">Select a Status</option>
                        {status.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>

                </CardBody>
            </Card>
        </>
    );
};

export default ProjectStep;
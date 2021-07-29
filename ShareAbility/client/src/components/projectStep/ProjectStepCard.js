import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { getAllStatuses } from "../../modules/statusManager";
import { getAllSteps, getStepById } from "../../modules/stepsManager";
import { updateProjectStep } from '../../modules/projectStepManager';

const ProjectStep = ({projectStep, setEdit, edit}) => {

    const [newProjectStep, setNewProjectStep] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [singleStep, setSingleStep] = useState({});
    
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const projectStepCopy = { ...projectStep };
        
        projectStepCopy[key] = parseInt(value);
        console.log(projectStepCopy);
        updateProjectStep(projectStepCopy)
        .then(setEdit(!edit));

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

    const getSingleStep = () => {
        return getStepById(projectStep.stepId)
        .then(stepFromApi => {
            setSingleStep(stepFromApi)
        })
    }

    useEffect(() => {
        getUsers();
        getStatuses();
        getSingleStep();
    }, []);

    return (
        <Card className="m-2 p-2 w-50 mx-auto">
            <CardBody className="m-3">
                <p>{singleStep.name}</p>
                <select defaultValue={projectStep.userProfileId} name="userProfileId" id="userProfileId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Worker</option>
                    {users.map(p => (
                        projectStep.userProfileId == parseInt(p.id) ? <option id="userProfileId" selected key={p.id} value={p.id}>{p.name}</option> : <option id="userProfileId" key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                
                <select defaultValue={projectStep.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Status</option>
                    {status.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                

            </CardBody>
        </Card>
    );
};

export default ProjectStep;
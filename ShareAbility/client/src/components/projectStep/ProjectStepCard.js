import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, FormGroup, Input } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { getAllStatuses } from "../../modules/statusManager";
import { getStepById } from "../../modules/stepsManager";
import { updateProjectStep } from '../../modules/projectStepManager';
import { addStepNote, getAllStepNotesByProjectId } from "../../modules/stepNotesManager";
import { useHistory } from 'react-router-dom';


const ProjectStepCard = ({projectStep, setEdit, edit }) => {

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [singleStep, setSingleStep] = useState({});
    const [showStepNotesForm, setShowStepNotesForm] = useState(false);
    const [newStepNote, setNewStepNote] = useState({
        stepId: projectStep.stepId,
        content: ''
    })

    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const projectStepCopy = { ...projectStep };
        
        projectStepCopy[key] = parseInt(value);
        updateProjectStep(projectStepCopy)
        .then(setEdit(!edit));

    };

    const toggle = () => setShowStepNotesForm(!showStepNotesForm)
    console.log(projectStep)
    console.log(newStepNote)
        
    const handleSubmit = (event) => {
        event.preventDefault();
        addStepNote(newStepNote).then(() => getAllStepNotesByProjectId(projectStep.projectId)).then(() => history.push(`/project/stepId/${singleStep.id}`));
    }

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
                    {users.map(u => (
                        projectStep.userProfileId == parseInt(u.id) ? <option id="userProfileId" selected key={u.id} value={u.id}>{u.name}</option> : <option id="userProfileId" key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                
                <select defaultValue={projectStep.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Status</option>
                    {status.map(s => (
                        projectStep.statusId == parseInt(s.id) ?
                        <option id="statusId" selected key={s.id} value={s.id}>{s.name}</option> : <option id="statusId" key={s.id} value={s.id}>{s.name}</option> 
                    ))}
                </select>
                
                <Button className="btn btn-primary" onClick={toggle}>{showStepNotesForm ? 'Cancel' : 'Add New Note'}</Button>

                {showStepNotesForm &&
                <>
                    <FormGroup>
                        <Input type="textarea" row="4" col="10" name="projectStepNotes" id="projectStepNotes" placeholder="projectStepNotes"
                            value={newStepNote.content}
                            onChange={handleInputChange} />
                    </FormGroup>
                  
                    <Button className="btn btn-primary" onClick={handleSubmit}>Save note</Button>
                 
                </>
            }

            </CardBody>
        </Card>
    );
};

export default ProjectStepCard;
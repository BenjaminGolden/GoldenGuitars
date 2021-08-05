import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, FormGroup, Input } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { getAllStatuses } from "../../modules/statusManager";
import { getStepById } from "../../modules/stepsManager";
import { updateProjectStep } from '../../modules/projectStepManager';
import { addStepNote, getAllStepNotes } from "../../modules/stepNotesManager";
import { useHistory } from 'react-router-dom';
import './projectStep.css'

const ProjectStepCard = ({ projectStep, setEdit, edit }) => {

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [singleStep, setSingleStep] = useState({});
    const [stepNotes, setStepNotes] = useState([]);
    const [showStepNotesForm, setShowStepNotesForm] = useState(false);
    const [newStepNote, setNewStepNote] = useState({
        stepId: projectStep.id,
        content: ''
    })

    const history = useHistory();

    //handle change event for project step users and status
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const projectStepCopy = { ...projectStep };

        projectStepCopy[key] = parseInt(value);
        updateProjectStep(projectStepCopy)
            .then(() => setEdit(!edit));

    };

    
    const handleStepNoteInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const newStepNoteCopy = { ...newStepNote };

        newStepNoteCopy[key] = value;
        setNewStepNote(newStepNoteCopy);
    };

    //Step Notes Toggle
    const stepNotesToggle = () => setShowStepNotesForm(!showStepNotesForm)

    
//Save button for Step Notes
    const handleSubmit = (event) => {
        event.preventDefault();
        addStepNote(newStepNote)
        .then(() => history.push(`/projectStepNotes/${projectStep.id}`));
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
        
        const getStepNotes = () => {
            return getAllStepNotes(projectStep.id)
            .then(stepNotesFromApi => {
                setStepNotes(stepNotesFromApi)
            })
    }

    const viewStepNotes = () => {
        if (stepNotes.length < 1)
        {
            window.alert("This step does not have any notes.");
        }
        else
        {
            return history.push(`/projectStepNotes/${projectStep.id}`);
        }
    }

    useEffect(() => {
        getUsers();
        getStatuses();
        getSingleStep();
        getStepNotes();
    }, []);

    return (
        <Card className=" w-50 m-2 mx-auto border-dark">
            <CardBody className="">
                <p>{singleStep.id}: {singleStep.name}</p>

                {/* Select a Worker */}

                <select defaultValue={projectStep.userProfileId} name="userProfileId" id="userProfileId" onChange={handleInputChange} className='font2 m-1'>
                    <option  value="0">Select a Worker</option>
                    {users.map(u => (
                        projectStep.userProfileId == parseInt(u.id) ? <option id="userProfileId" selected key={u.id} value={u.id} >{u.name}</option> : <option id="userProfileId" key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>

                {/* Select a Status */}

                <select defaultValue={projectStep.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='font2 m-1'>
                    <option value="0">Select a Status</option>
                    {status.map(s => (
                        projectStep.statusId == parseInt(s.id) ?
                            <option id="statusId" selected key={s.id} value={s.id}>{s.name}</option> : <option id="statusId" key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>

                {/* View Step Notes */}

                <Button className="btn btn-dark m-1" onClick={viewStepNotes}>View Step Notes</Button>
                <Button className="btn btn-dark" onClick={stepNotesToggle}>Add a note</Button>

                {showStepNotesForm &&
                           <>
                           <FormGroup className="font2">
                               <Input type="textarea" row="4" col="100" name="content" id="content" placeholder="add a note to this project step"
                                   value={newStepNote.content}
                                   onChange={handleStepNoteInputChange} />
                           </FormGroup>

                           <Button className="btn btn-dark" onClick={handleSubmit}>Save note</Button>
                       </>
                }

            </CardBody>
        </Card>
    );
};

export default ProjectStepCard;
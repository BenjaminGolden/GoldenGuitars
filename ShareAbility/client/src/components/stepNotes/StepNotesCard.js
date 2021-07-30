import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, FormGroup, Input, CardTitle, CardText } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { getAllStatuses } from "../../modules/statusManager";
import { getStepById } from "../../modules/stepsManager";
import { updateProjectStep } from '../../modules/projectStepManager';
import { addStepNote, getAllNotesByProjectAndStepId } from "../../modules/stepNotesManager";
import { useHistory } from 'react-router-dom';


const StepNoteCard = ({projectStep}) => {

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [singleStep, setSingleStep] = useState({});
    const [showStepNotesForm, setShowStepNotesForm] = useState(false);
    const [newStepNote, setNewStepNote] = useState({
        stepId: singleStep.id,
        content: ''
    })

    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const newStepNoteCopy = { ...newStepNote };
        
        newStepNoteCopy[key] = value;
        setNewStepNote(newStepNoteCopy);
      

    };


    const toggle = () => setShowStepNotesForm(!showStepNotesForm)
    console.log(projectStep)
    console.log(newStepNote)
        
    const handleSubmit = (event) => {
        event.preventDefault();
        addStepNote(newStepNote).then(() => getAllNotesByProjectAndStepId(projectStep.projectId)).then(() => history.push(`/project/${projectStep.projectId}/stepNotes/${singleStep.id}`));
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
                <CardTitle>
                    <strong> Author: {newStepNote.userProfile.name}  </strong>
                    <hr />
                </CardTitle>
                <CardText>
                    <p>Notes: {newStepNote.content}</p>
                </CardText>
                
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

export default StepNoteCard;
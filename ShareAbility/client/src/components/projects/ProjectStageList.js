import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllUsers } from '../../modules/userManager';
import { getAllStatuses } from '../../modules/statusManager'
import { updateProject } from '../../modules/projectManager';
import { getAllStages } from '../../modules/stageManager';
import Stage from '../stages/StageCard';

const ProjectStageForm = () => {
    
    const [newProjectStage, setNewProjectStage] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [stage, setStage] = useState([]);

    const history = useHistory();
    const params = useParams();
    
    
    
    // const emptyProjectStage = {       
        
       
    // };

    // const handleInputChange = (evt) => {
    //     const value = evt.target.value;
    //     const key = evt.target.id;

    //     const projectCopy = { ...newProjectStage };

    //     projectCopy[key] = value;
    //     setNewProjectStage(projectCopy);
    // };

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

    
    const getStages = () => {
        return getAllStages(params)
        .then(stagesFromAPI => {
            setStage(stagesFromAPI)
        })
    }   

    //You could also do after a selection is made from dropdown, then it would use a handleOnChange function, 
    const handleSave = (evt) => {
        evt.preventDefault();
            updateProject(stage).then((p) => {
                history.push(`/project/details/${p.id}`);
            });
    };

    useEffect(() => {
        getUsers();
        getStatuses();
        getStages()
    }, [])



    return (
        <>
        <Form className="container w-75">
            <h2>Assign workers and select step status: </h2>
           <div>
            {stage?.map((stage) => (
                <Stage stage={stage} key={stage.id}/>
            ))}
            </div>
            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
        </>
    );
};

export default ProjectStageForm;
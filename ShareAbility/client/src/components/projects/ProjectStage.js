import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllUsers } from '../../modules/userManager';
import { getAllStatuses } from '../../modules/statusManager'
import { addProject } from '../../modules/projectManager';
// import MultiSelect from "react-multi-select-component";

const ProjectStageForm = () => {
    const emptyProjectStage = {       
        
       
    };

    const [newProjectStage, setNewProjectStage] = useState(emptyProjectStage);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [selected, setSelected] = useState(false);

    const history = useHistory();
 
    const handleOnChange = () => {
        setSelected(!selected);
    }



    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectCopy = { ...newProjectStage };

        projectCopy[key] = value;
        setNewProjectStage(projectCopy);
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


    const handleSave = (evt) => {
        evt.preventDefault();

        if (newProjectStage.name === '')
        {
        window.alert('project name is a required fields')
        setNewProjectStage({
            name: '',
     
        })
        return history.push(`/project/add`);
        }
        else 
        {
            addProject(newProjectStage).then((p) => {
                history.push(`/project/details/${p.id}`);
            });
        }
    };

    useEffect(() => {
        getUsers();
        getStatuses();
    }, [])



    return (
        <>
        <Form className="container w-75">
            <h2>Assign workers and select step status: </h2>
            <FormGroup>
                <Label for="step 1">Wood preparation, routing, and drilling. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
               
            </FormGroup>
            <FormGroup>
                <Label for="step 2">Finishing. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="step 3">Setup and Assembly. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="step 4">Final Testing. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="step 5">Metal scoring and painting. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="step 6">Post installation and final assembly. </Label>
                <select value={newProjectStage.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Assign to: </option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
                <select value={newProjectStage.statusId} name="statusId" id="statusId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Status: </option>
                    {status.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>

           {/* <FormGroup>
           <Label for="stage">Stage </Label>
            <select value={newProject.stageId} name="stageId" id="stageId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a stage</option>
                    {stages.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </FormGroup>  */}

            {/* <FormGroup>
            <Label for="content">Content </Label> 
            
                <textarea  type="text" name="content" id="content" placeholder="content"
                    value={newProject.content} 
                    onChange={handleInputChange} rows="10" cols="145" />
                    
            </FormGroup> */}

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
        </>
    );
};

export default ProjectStageForm;
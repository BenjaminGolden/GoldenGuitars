import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getProjectById, updateProject } from '../../modules/projectManager';
import { momentStartDateFixer, momentCompletionDateFixer } from '../../modules/helper';
import "./projectDetails.css"

const ProjectEditForm = () => {

    const [editProject, setEditProject] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getProject = () => {
        return getProjectById(id)
        .then(project => {
            let editedProject = project
            editedProject.startDate = momentStartDateFixer(project)
            editedProject.completionDate = momentCompletionDateFixer(project)
            setEditProject(editedProject)});
    }

    console.log(editProject);
    
    const handleInputChange = (event) => {
        const selectedVal = event.target.value;
        const key = event.target.id;
        const projectCopy = { ...editProject };
        projectCopy[key] = selectedVal;
        setEditProject(projectCopy);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedProject = {
            id: editProject.id,
            name: editProject.name,
            startDate: editProject.startDate,
            completionDate: editProject.completionDate
        };
        updateProject(editedProject)
        .then((res) => {
            console.log(res, "response")
            history.push(`/project/details/${id}`)
        })
    }

//TODO: start date needs to populate on the edit form.
const handleDate = (event) => {
    event.preventDefault();
    let editedProject = { ...editProject };
    let editDate = event.target.value
    editedProject[event.target.id] = editDate
    setEditProject(editedProject)
    console.log("edited project", editedProject)
}

    useEffect(() => {
        getProject();
    }, [])

    return (
        <Form className="opacity w-50 mx-auto">
            <h2>Edit Project</h2>
           
            <FormGroup>
                <Label for="name"><strong>Name </strong></Label>
                <Input type="text" name="name" id="name" placeholder="" required
                    value={editProject.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <FormGroup >
                <Label  for="startDate"><strong>Start Date </strong></Label>
                <Input type="date" name="startDate" id="startDate" placeholder="start date" 
                    
                     defaultValue={momentStartDateFixer(editProject)} format="YYYY-MM-DD" value={editProject.startDate} onChange={handleDate}/>
            </FormGroup>

            <FormGroup>
                <Label for="completionDate"><strong>Completion Date </strong></Label>
                <Input type="date" name="completionDate" id="completionDate" placeholder="completion date" 
                    
                     defaultValue={momentCompletionDateFixer(editProject)} format="YYYY-MM-DD" value={editProject.completionDate} onChange={handleDate}/>
            </FormGroup>

            <Button className="btn btn-dark" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-dark m-3" onClick={() => history.push(`/project/details/${editProject.id}`)}>Cancel</Button>
        </Form>
    );
};

export default ProjectEditForm;
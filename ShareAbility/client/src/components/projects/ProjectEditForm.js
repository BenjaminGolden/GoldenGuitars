import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getProjectById, updateProject } from '../../modules/projectManager';
import { momentStartDateFixer, momentCompletionDateFixer } from '../../modules/helper';

const ProjectEditForm = () => {

    const [editProject, setEditProject] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getProject = () => {
        getProjectById(id)
        .then(project => setEditProject(project));
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
}

    useEffect(() => {
        getProject();
    }, [])

    return (
        <Form>
            <h2>Edit Project</h2>
           
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="" required
                    value={editProject.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input type="date" name="startDate" id="startDate" placeholder="start date" 
                    
                     defaultValue={momentStartDateFixer(editProject)} format="YYYY-MM-DD" value={editProject.startDate} onChange={handleDate}/>
            </FormGroup>

            <FormGroup>
                <Label for="completionDate">Completion Date</Label>
                <Input type="date" name="completionDate" id="completionDate" placeholder="completion date" 
                    
                     defaultValue={momentCompletionDateFixer(editProject)} format="YYYY-MM-DD" value={editProject.completionDate} onChange={handleDate}/>
            </FormGroup>

            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={() => history.push(`/project/details/${editProject.id}`)}>Cancel</Button>
        </Form>
    );
};

export default ProjectEditForm;
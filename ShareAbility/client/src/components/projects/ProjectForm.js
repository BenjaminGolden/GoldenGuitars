import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addProject } from '../../modules/projectManager';
import './projectDetails.css'

const ProjectForm = () => {
    const emptyProject = {
        name: ''

    };

    const [newProject, setNewProject] = useState(emptyProject);

    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectCopy = { ...newProject };

        projectCopy[key] = value;
        setNewProject(projectCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
      
        if (newProject.name === '') {
            window.alert('project name is a required fields')
            setNewProject({
                name: '',

            })
            return history.push(`/project/add`);
        }
        else {
            addProject(newProject).then((p) => {
                history.push(`/project/details/${p.id}`);
            });
        }
    };

    return (
        <>
            <Form className="container w-75 opacity">
                <h2 className="font">Create A New Project</h2>
                <FormGroup>
                    
                    <Input type="text" name="name" id="name" placeholder="Project Name"
                        value={newProject.name}
                        onChange={handleInputChange} />
                </FormGroup>

                <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
                <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

            </Form>
        </>
    );
};

export default ProjectForm;
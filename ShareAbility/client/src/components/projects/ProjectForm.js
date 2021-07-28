import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllProjectSteps } from "../../modules/projectStepManager";
import { addProject } from '../../modules/projectManager';

const ProjectForm = () => {
    const emptyProject = {
        name: ''

    };

    const [newProject, setNewProject] = useState(emptyProject);
    const [steps, setSteps] = useState([]);
    // const [ProjectSteps, setProjectSteps] = useState([]);


    // const getProjectSteps= () => {
    //     return getAllProjectSteps()
    //     .then(ProjectStepsFromAPI => {
    //         setProjectSteps(ProjectStepsFromAPI)
    //     })
    // }    

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
                history.push(`/project/${p.id}`);
            });
        }
    };

    // useEffect(() =>{
    //     getProjectSteps()
    // }, []);

    return (
        <>
            <Form className="container w-75">
                <h2>New Project</h2>
                <FormGroup>
                    <Label for="name">Project Name</Label>
                    <Input type="text" name="name" id="name" placeholder="name"
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
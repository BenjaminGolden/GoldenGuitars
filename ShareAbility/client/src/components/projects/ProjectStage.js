import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllSteps } from "../../modules/stepsManager";
import { addProject } from '../../modules/projectManager';
// import MultiSelect from "react-multi-select-component";

const ProjectStageForm = () => {
    const emptyProjectStage = {       
        
       
    };

    const [newProjectStage, setNewProjectStage] = useState(emptyProjectStage);
    const [steps, setSteps] = useState([]);
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

    const getSteps = () => {
        return getAllSteps()
        .then(stepsFromAPI => {
            setSteps(stepsFromAPI)
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
        getSteps();
    }, [])



    return (
        <>
        <Form className="container w-75">
            <h2>New Project</h2>
            <FormGroup>
                <Label for="name">Project Name</Label>
                <Input type="text" name="name" id="name" placeholder="name"
                    value={newProjectStage.name}
                    onChange={handleInputChange} />
            </FormGroup>

            {/* stage  */}

            {/* <Label for="cars">Select All Steps for this project:</Label>

            <select value={newProject.stepId} name="stage" id="stage" onChange={handleOnChange} multiple>
            <option value="1">Wood preparation, routing, drilling</option>
            <option value="2">Finishing</option>
            <option value="3">Setup and assembly</option>
            <option value="4">final testing</option>
            <option value="5">metal scoring and painting</option>
            <option value="6">Post installation and final assembly</option>
            </select> */}

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
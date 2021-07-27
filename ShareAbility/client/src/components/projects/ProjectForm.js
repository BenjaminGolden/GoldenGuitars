import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllStages } from "../../modules/stageManager";
import { addProject } from '../../modules/projectManager';
import MultiSelect from "react-multi-select-component";

const ProjectForm = () => {
    const emptyProject = {       
        name: '',
        startDate: '',
   
    };

    const [newProject, setNewProject] = useState(emptyProject);
    const [stages, setStages] = useState([]);
    // const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const history = useHistory();
 
    // const handleOnChange = () => {
    //     setIsChecked(!isChecked);
    // }



    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectCopy = { ...newProject };

        projectCopy[key] = value;
        setNewProject(projectCopy);
    };

    const getStages = () => {
        return getAllStages()
        .then(stagesFromAPI => {
            setStages(stagesFromAPI)
        })
    }    



    const handleSave = (evt) => {
        evt.preventDefault();

        if (newProject.name === '')
        {
        window.alert('project name is a required fields')
        setNewProject({
            name: '',
     
        })
        return history.push(`/project/add`);
        }
        else 
        {
            addProject(newProject).then((p) => {
                history.push(`/project/details/${p.id}`);
            });
        }
    };

    // const stageSelect = () => {
    //     const options = stages.map(s => s.name)
    //     return options;
    //}

    useEffect(() => {
        getStages();
    }, [])



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

            {/* stage  */}

            <div>
            <h1>Select Stages</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
                 options=
                 //{stageSelect()}
                {stages.map(s => s)}
                //     <option key={s.id} value={s.id}>{s.name}</option>
                // ))}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />
            </div>

            {/* <div>
                Select project stages:
                <div>
                    <input
                    type= "checkbox"
                    id="stage"
                    name="stage"
                    value=""
                    />
                </div>
            </div> */}

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

export default ProjectForm;
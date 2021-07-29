import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateProjectStep } from '../../modules/projectStepManager';
import { getAllProjectSteps } from '../../modules/projectStepManager';
import ProjectStep from './ProjectStepCard';

const ProjectStepForm = () => {

    const [projectStep, setProjectStep] = useState([]);
    const [saveSteps, setSaveSteps] = useState([]);
    const [edit, setEdit] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    const getProjectSteps = () => {
        return getAllProjectSteps(id)
        .then(projectStepsFromAPI => {
            setProjectStep(projectStepsFromAPI)
            
        })
    }   

    const handleSave = (evt) => {
        evt.preventDefault();
            updateProjectStep(projectStep).then((p) => {
                history.push(`/project/details/${p.id}`);
            });
    };

    useEffect(() => {
        getProjectSteps()
    }, [edit])



    return (
        <>
        <Form className="container w-75">
            <h2>Assign workers and select step status: </h2>
           <div>
               
            {projectStep?.map((projectStep) => (
                <ProjectStep projectStep={projectStep} key={projectStep.id} setEdit={setEdit} edit={edit}/>
            ))}
            </div>
            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
        </>
    );
};

export default ProjectStepForm;
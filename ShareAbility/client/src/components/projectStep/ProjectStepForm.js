import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateProjectStep } from '../../modules/projectStepManager';
import { getAllProjectSteps } from '../../modules/projectStepManager';
import ProjectStep from './ProjectStepCard';

const ProjectStepForm = () => {

    const [projectStep, setProjectStep] = useState([]);
    const [saveSteps, setSaveSteps] = useState([]);

    const history = useHistory();
    const { id } = useParams();

    const getProjectSteps = () => {
        return getAllProjectSteps(id)
        .then(projectStepsFromAPI => {
            setProjectStep(projectStepsFromAPI)
            
        })
    }   

    //You could also do after a selection is made from dropdown, then it would use a handleOnChange function, 

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectStepCopy = { ...saveSteps };

        projectStepCopy[key] = value;
        setSaveSteps(projectStepCopy);
    };

    // const handleSave = (evt) => {
    //     evt.preventDefault();
    //         updateProjectStep(projectStep).then((p) => {
    //             history.push(`/project/details/${p.id}`);
    //         });
    // };

    useEffect(() => {
        getProjectSteps()
    }, [])



    return (
        <>
        <Form className="container w-75">
            <h2>Assign workers and select step status: </h2>
           <div>
            {projectStep?.map((projectStep) => (
                <ProjectStep projectStep={projectStep} key={projectStep.id}/>
            ))}
            </div>
            <Button className="btn btn-primary" onClick={handleInputChange}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
        </>
    );
};

export default ProjectStepForm;
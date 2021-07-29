import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateProjectStep } from '../../modules/projectStepManager';
import { getAllProjectSteps } from '../../modules/projectStepManager';
import ProjectStepCard from './ProjectStepCard';

const ProjectStepForm = () => {

    const [projectStep, setProjectStep] = useState([]);
    const [edit, setEdit] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    const getProjectSteps = () => {
        return getAllProjectSteps(id)
            .then(projectStepsFromAPI => {
                setProjectStep(projectStepsFromAPI)

            })
    }

    useEffect(() => {
        getProjectSteps()
    }, [edit])


  
        return (
            <>
                <Form className="container w-75">

                    <h3 >Assign workers and Step Status: </h3>
                    <div>

                        {projectStep?.map((projectStep) => (
                            <ProjectStepCard projectStep={projectStep} key={projectStep.id} setEdit={setEdit} edit={edit} />
                        ))}
                    </div>
                             
                    <Button className="btn btn-primary" onClick={() => history.push(`/project/myTasks/${id}`)}>My Tasks</Button>
                    <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Home</Button>

                </Form>
            </>
        );
    
};

export default ProjectStepForm;
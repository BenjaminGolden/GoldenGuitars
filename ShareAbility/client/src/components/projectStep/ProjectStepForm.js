import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import { getAllProjectSteps } from '../../modules/projectStepManager';
import ProjectStepCard from './ProjectStepCard';

const ProjectStepForm = () => {

    const [projectStep, setProjectStep] = useState([]);
    const [edit, setEdit] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    //GET ALL PROJECT STEPS
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
                <div className="container">
                    <div className="row m-3 mx-auto justify-content-center">

                        {projectStep?.map((projectStep) => (
                            <ProjectStepCard projectStep={projectStep} key={projectStep.id} setEdit={setEdit} edit={edit} />
                        ))}
                    </div>
                </div>

            </Form>
        </>
    );

};

export default ProjectStepForm;
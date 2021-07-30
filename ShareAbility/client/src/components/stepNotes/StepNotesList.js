import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import StepNoteCard from "./StepNotesCard";
import { getAllNotesByProjectAndStepId } from "../../modules/stepNotesManager";
import { getAllProjectSteps } from '../../modules/projectStepManager';

const StepNotesList = () => {
    const [projectStep, setProjectStep] = useState([]);
    const [notes, setNotes] = useState([]);
    const { id } = useParams();

    const getStepNotesByProjectId = () => {
        getAllNotesByProjectAndStepId(id).then((response) => setNotes(response));
    }

    const getProjectSteps = () => {
        return getAllProjectSteps(id)
            .then(projectStepsFromAPI => {
                setProjectStep(projectStepsFromAPI)

            })
    }

    // const handleDate = () => {
    //     let date = new Date(post.publishDateTime).toDateString();
    //     return date;
    // };


    useEffect(() => {
        getProjectSteps();
        getStepNotesByProjectId();
    }, [])

    return (
        <div className="row justify-content-center">
            {notes.map((n) =>
                <StepNoteCard notes={notes} key={notes.id} getNotes={getAllNotesByProjectAndStepId} />
            )}
        </div>
    );
}

export default StepNotesList;
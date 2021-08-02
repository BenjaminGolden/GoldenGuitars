import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import StepNotesCard from './StepNotesCard';
import { getAllStepNotes } from "../../modules/stepNotesManager";
import { getProjectById } from "../../modules/projectManager";

const StepNotesList = () => {

    const [notes, setNotes] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const getStepNotes = () => {

        getAllStepNotes(id)
            .then((response) =>
                setNotes(response)
            );

    }

    useEffect(() => {
        getStepNotes();

    }, [])

    return (
        <>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Home</Button>

            <div className="container ">  Project name:  {notes[0]?.project?.name}

                <div className="row justify-content-center">
                    <Card >
                        <CardBody>
                            <strong>Project Step: {notes[0]?.steps?.name}</strong>
                        </CardBody>
                    </Card>
                </div>
                <div className="row justify-content-center">
                    {notes.map((note) =>
                        <StepNotesCard note={note} key={note.id} getNotes={getStepNotes} />
                    )}
                </div>
            </div>
        </>
    );
}

export default StepNotesList;
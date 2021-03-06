import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import StepNotesCard from './StepNotesCard';
import { getAllStepNotes } from "../../modules/stepNotesManager";

const StepNotesList = ({user}) => {

    const [notes, setNotes] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const getStepNotes = () => {

        getAllStepNotes(id)
            .then((response) =>
                setNotes(response)
            );

    }
console.log(notes)
    useEffect(() => {
        getStepNotes();

    }, [])

    return (
        <>
            <Button className="btn btn-dark opacity" onClick={() => history.push(`/project/details/${notes[0].project.id}`)}>Back</Button>

            <div className="container opacity"> 

                <div className="row justify-content-center">
                    <Card >
                        <CardBody>
                            <strong>{notes[0]?.project?.name}: {notes[0]?.steps?.name}</strong>
                        </CardBody>
                    </Card>
                </div>
                <div className="row justify-content-center">
                    {notes.map((note) =>
                        <StepNotesCard note={note} key={note.id} user={user} getNotes={getStepNotes} />
                    )}
                </div>
            </div>
        </>
    );
}

export default StepNotesList;
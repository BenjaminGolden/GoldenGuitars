import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteStepNote } from '../../modules/stepNotesManager';
import { Link } from "react-router-dom";


const StepNotesCard = ({ note, getNotes }) => {

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteStepNote(note.id).then(() => getNotes());
        }
    };

    return (
        <Card className="m-2 w-50">
            <CardBody>
                <CardTitle>
                    <strong>{note.userProfile?.name} </strong>
                    <hr />
                </CardTitle>

                <CardText>
                    <p>{note.content}</p>
                </CardText>

                <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                <Link to={`/projectStepNote/edit/${note.id}`}>
                    <Button className="btn btn-info">Edit Note</Button>
                </Link>

            </CardBody>
        </Card>
    );
}

export default StepNotesCard;
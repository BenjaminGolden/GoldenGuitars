import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteStepNote } from '../../modules/stepNotesManager';
import { Link } from "react-router-dom";


const StepNotesCard = ({ note, getNotes, user }) => {

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

                {user.id === note.userProfileId &&
                    <>
                        <Button className="btn btn-dark m-2" onClick={handleDelete}>Delete</Button>
                        <Link to={`/projectStepNote/edit/${note.id}`}>
                            <Button className="btn btn-dark m-2">Edit Note</Button>
                        </Link>
                    </>
                }
            </CardBody>
        </Card>
    );
}

export default StepNotesCard;
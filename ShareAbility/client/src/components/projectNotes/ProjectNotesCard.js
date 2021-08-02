import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteProjectNote} from '../../modules/projectNotesManager';
import { Link } from "react-router-dom";


const ProjectNotesCard = ({ note, getNotes }) => {

    // const history = useHistory();

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteProjectNote(note.id).then(() => getNotes());

        }

    };

    

    // const handleDate = () => {
    //     let date = new Date(notes.createDateTime).toDateString();
    //     return date;
    // };
    
    useEffect(() =>{

    })


    return (
        <Card className="m-2 w-50">
            <CardBody>
                <CardTitle>
                    <strong>{note.userProfile.name} </strong>
                    <hr />
                </CardTitle>
                
                <CardText>
                    <p>{note.content}</p>
                </CardText>

                <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                <Link to={`/projectNote/edit/${note.id}`}>
                    <Button className="btn btn-info">Edit Comment</Button>
                </Link>

            </CardBody>
        </Card>
    );
}

export default ProjectNotesCard;
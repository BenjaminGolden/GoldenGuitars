import { Button } from 'reactstrap';
import React, { useEffect } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteProjectNote} from '../../modules/projectNotesManager';
import { Link } from "react-router-dom";



const ProjectNotesCard = ({ note, getNotes, user }) => {

    const handleDate = () => {
        let date = new Date(note.date).toDateString();
        return date;
    };


    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this note?")) {
            deleteProjectNote(note.id).then(() => getNotes());
        }
    };
    
    useEffect(() =>{

    })


    return (
        <Card className="m-2 w-50">
            <CardBody>
                <CardTitle>
                    <strong>{note.userProfile.name} </strong>
                   
                </CardTitle>
                
                <CardText>
                <p> <strong>{handleDate()}</strong>: {note.content}</p>
                </CardText>
                {user.id === note.userProfileId &&
            <>
                
                <Button className="btn btn-dark m-2" onClick={handleDelete}>Delete Note</Button>
                <Link to={`/projectNote/edit/${note.id}`}>
                    <Button className="btn btn-dark m-2">Edit Note</Button>
                </Link>
            </>
                }

            </CardBody>
        </Card>
    );
}

export default ProjectNotesCard;
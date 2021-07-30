import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ProjectNotesCard from './ProjectNotesCard';
import { getAllProjectNotesbyProjectId} from "../../modules/projectNotesManager"; 
;


const ProjectNotesList = () => {

    const [notes, setNotes] = useState([]);
    const { id } = useParams();
    console.log(notes);
    
    console.log(id);

    const getNotesByProjectId = () => {
       getAllProjectNotesbyProjectId(id)
        .then((response) =>
        setNotes(response)
        );
       
    }
    // const handleDate = () => {
    //     let date = new Date(post.publishDateTime).toDateString();
    //     return date;
    // };


    useEffect(() => {
        getNotesByProjectId();
    }, [])

    return (
        <>
        <div className="container m-2">
            <div className="row justify-content-center">
                <Card >
                    <CardBody>

                        {/* <Link to={`/comment/add/${post.id}`}>
                            <Button className="btn btn-success">Add Comment</Button>
                        </Link> */}
                    </CardBody>
                </Card>
            </div>
            <div className="row justify-content-center">
                {notes.map((note) =>
                    <ProjectNotesCard note={note} key={note.id}  getNotes={getNotesByProjectId}/>
                )}
            </div>
        </div>
        </>
    );
}

export default ProjectNotesList;
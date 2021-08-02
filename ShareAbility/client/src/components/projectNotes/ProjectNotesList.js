import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import ProjectNotesCard from './ProjectNotesCard';
import { getAllProjectNotesbyProjectId} from "../../modules/projectNotesManager"; 
import { getProjectById } from "../../modules/projectManager";



const ProjectNotesList = () => {

    const [notes, setNotes] = useState([]);
    const [project, setProject] = useState({});
    const { id } = useParams();
    const history = useHistory();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getNotesByProjectId = () => {
       sleep(600).then(() => 
       getAllProjectNotesbyProjectId(id))
        .then((response) =>
        setNotes(response)
        )
    };

    const getProject = () => {
        getProjectById(id)
         .then((response) =>
         setProject(response)
         );
    }
        
    // const handleDate = () => {
    //     let date = new Date(post.publishDateTime).toDateString();
    //     return date;
    // };


    useEffect(() => {
        getNotesByProjectId();
        getProject();
    }, [])

    return (
        <>
          <Button className="btn btn-primary" onClick={() => history.push(`/project/details/${project.id}`)}>back</Button>
        <div className="container m-2">
            <div className="row justify-content-center">
                <Card >
                    <CardBody>
                    <strong>{project.name}</strong>
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
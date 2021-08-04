import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import ProjectNotesCard from './ProjectNotesCard';
import { getAllProjectNotesbyProjectId} from "../../modules/projectNotesManager"; 
import { getProjectById } from "../../modules/projectManager";



const ProjectNotesList = ({user}) => {

    const [notes, setNotes] = useState([]);
    const [project, setProject] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getNotesByProjectId = () => {
      
       getAllProjectNotesbyProjectId(id)
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

    useEffect(() => {
        getNotesByProjectId();
        getProject();
    }, [])

    return (
        <>
          <Button className="btn btn-dark" onClick={() => history.push(`/project/details/${project.id}`)}>back</Button>
        <div className="container opacity">
            <div className="row justify-content-center">
                <Card className="w-55 ">
                    <CardBody >
                    <strong>{project.name}</strong>
                    </CardBody>
                </Card>
            </div>
            <div className="row justify-content-center">
                {notes.map((note) =>
                    <ProjectNotesCard note={note} key={note.id} user={user} getNotes={getNotesByProjectId}/>
                )}
            </div>
        </div>
        </>
    );
}

export default ProjectNotesList;
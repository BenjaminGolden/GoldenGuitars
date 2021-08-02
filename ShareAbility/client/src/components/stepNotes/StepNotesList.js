import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import StepNotesCard from './StepNotesCard';
import { getAllStepNotes} from "../../modules/stepNotesManager"; 
import { getProjectById } from "../../modules/projectManager";



const StepNotesList = () => {

    const [notes, setNotes] = useState([]);
    const [project, setProject] = useState({});
    const { id } = useParams();

    const getStepNotes = () => {
       getAllStepNotes(id)
        .then((response) =>
        setNotes(response)
        );
       
    }
   

    // const getProject = () => {
    //     getProjectById(notes.projectId)
    //      .then((response) =>
    //      setProject(response)
    //      );
    // }
        
    // const handleDate = () => {
    //     let date = new Date(post.publishDateTime).toDateString();
    //     return date;
    // };


    useEffect(() => {
        getStepNotes();
        // getProject();
    }, [])

    //TODO: Fix display to show project/step name above comments:
    return (
        <>
        <div className="container m-2">
            <div className="row justify-content-center">
                <Card >
                    <CardBody>
                    <strong>{notes.stepId}</strong>
                    </CardBody>
                </Card>
            </div>
            <div className="row justify-content-center">
                {notes.map((note) =>
                    <StepNotesCard note={note} key={note.id}  getNotes={getStepNotes}/>
                )}
            </div>
        </div>
        </>
    );
}

export default StepNotesList;
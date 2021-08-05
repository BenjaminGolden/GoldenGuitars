import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { getStepNoteById, updateStepNote } from '../../modules/stepNotesManager';

const ProjectStepNoteEditForm = () => {

    const [editProjectStepNote, setEditProjectStepNote] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getProjectStepNote = () => {
        getStepNoteById(id)
        .then(note => setEditProjectStepNote(note));
    }
    
    const handleInputChange = (event) => {
        const selectedVal = event.target.value;
        const key = event.target.id;
        const projectStepNoteCopy = { ...editProjectStepNote };
        projectStepNoteCopy[key] = selectedVal;
        setEditProjectStepNote(projectStepNoteCopy);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedProjectStepNote = {
            id: editProjectStepNote.id,
            content: editProjectStepNote.content
        };
        updateStepNote(editedProjectStepNote)
        .then((res) => {
            history.push(`/projectStepNotes/${editProjectStepNote.stepId}`)
        })
    }


    useEffect(() => {
        getProjectStepNote();
        
    }, [])

    return (
        <Form className="opacity w-75 mx-auto">
            <h2>Edit note</h2>
           
            <FormGroup>
       
                <Input type="textarea" name="content" id="content" placeholder="" required
                    value={editProjectStepNote.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-dark m-2" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-dark m-2" onClick={() => history.push(`/projectStepNotes/${editProjectStepNote.stepId}`)}>Cancel</Button>
        </Form>
    );
};

export default ProjectStepNoteEditForm;
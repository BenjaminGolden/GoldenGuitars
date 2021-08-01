import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getStepNoteById, updateStepNote } from '../../modules/stepNotesManager';

const ProjectStepNoteEditForm = () => {

    const [editProjectStepNote, setEditProjectStepNote] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getProjectStepNote = () => {
        getStepNoteById(id)
        .then(note => setEditProjectStepNote(note));
    }

    console.log(editProjectStepNote);
    
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
            history.push(`/projectStepNotes/${editProjectStepNote.projectId}`)
        })
    }


    useEffect(() => {
        getProjectStepNote();
        
    }, [])

    return (
        <Form>
            <h2>Edit note</h2>
           
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="text" name="content" id="content" placeholder="" required
                    value={editProjectStepNote.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={() => history.push(`/projectNotes/${editProjectStepNote.ProjectId}`)}>Cancel</Button>
        </Form>
    );
};

export default ProjectStepNoteEditForm;
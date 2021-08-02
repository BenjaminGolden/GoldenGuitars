import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getProjectNoteById, updateProjectNote } from '../../modules/projectNotesManager';

const ProjectNoteEditForm = () => {

    const [editProjectNote, setEditProjectNote] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getProjectNote = () => {
        getProjectNoteById(id)
        .then(note => setEditProjectNote(note));
    }

    // console.log(editProjectNote);
    
    const handleInputChange = (event) => {
        const selectedVal = event.target.value;
        const key = event.target.id;
        const projectNoteCopy = { ...editProjectNote };
        projectNoteCopy[key] = selectedVal;
        setEditProjectNote(projectNoteCopy);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedProjectNote = {
            id: editProjectNote.id,
            content: editProjectNote.content
        };
        updateProjectNote(editedProjectNote)
        .then((res) => {
            history.push(`/projectNotes/${editProjectNote.projectId}`)
        })
    }


    useEffect(() => {
        getProjectNote();
    }, [])

    return (
        <Form>
            <h2>Edit note</h2>
           
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="textarea" name="content" id="content" placeholder="" required
                    value={editProjectNote.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={() => history.push(`/projectNotes/${editProjectNote.ProjectId}`)}>Cancel</Button>
        </Form>
    );
};

export default ProjectNoteEditForm;
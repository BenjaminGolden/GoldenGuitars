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
            <h2>Edit Note</h2>
           
            <FormGroup className="w-50 mx-auto opacity">
                
                <Input type="textarea" name="content" id="content" placeholder="" required
                    value={editProjectNote.content}
                    onChange={handleInputChange} />
            <Button className="btn btn-dark m-2" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-dark m-2" onClick={() => history.push(`/projectNotes/${editProjectNote.projectId}`)}>Cancel</Button>
            </FormGroup>

        </Form>
    );
};

export default ProjectNoteEditForm;
// import React, { useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { addStepNote, getAllStepNotesByProjectId } from "../../modules/stepNotesManager";

// const StepNotesForm = () => {

//     const { id } = useParams();
//     const history = useHistory();
//     const [newStepNote, setNewStepNote] = useState({
//         projectId: id,
//         content: ''
//     })

//     const handleInputChange = (event) => {
//         let value = event.target.value;
//         let selectedValue = event.target.id;
//         let newNoteCopy = { ...newStepNote };
//         newNoteCopy[selectedValue] = value;
//         newNoteCopy.projectId = id;
//         setNewStepNote(newNoteCopy);
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         addStepNote(newStepNote).then(() => getAllStepNotesByProjectId(id)).then(() => history.push(`/project/stepId/${id}`));
//     }

//     return (
//         <Form>
//             <h2>Add a Note</h2>
//             <FormGroup>
//                 <Label for="subject">Content</Label>
//                 <Input type="text" name="subject" id="subject" placeholder="Subject" required
//                     value={newStepNote.content}
//                     onChange={handleInputChange} />
//             </FormGroup>
    
//             <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
//             <Button className="btn btn-danger" onClick={() => history.push(`/post/details/${id}`)}>Cancel</Button>
//         </Form>
//     );
// }

// export default StepNotesForm;
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { getAllProjects } from "../modules/projectManager";
import { useHistory } from "react-router";
    
const Home = () => {
    const [projects, setProjects]= useState([]);

    const getAllGuitarProjects = () => {
        getAllProjects()
        .then(projects => setProjects(projects))
    }
    
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const projectCopy = { ...projects };

        projectCopy[key] = value;
        setProjects(projectCopy);
    };

    useEffect(() => {
        getAllGuitarProjects()
    }, []);

    return (
        <Card className="m-2 p-2 w-50 mx-auto">
            <CardBody className="m-3">
                <Link to={`/project/add`}>
                <p><b>New Project: </b></p>
                </Link>
                            
                <Link to={`/project/${projects.id}`}> 
                    <select value={projects.Id} name="projectId" id="projectId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Project</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    </select>
                </Link>
            </CardBody>
        </Card>
    );

};

export default Home;
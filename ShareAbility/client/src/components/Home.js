import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { getAllProjects } from "../modules/projectManager";
import { useHistory } from "react-router";
import './header.css'

    
const Home = () => {
    const [projects, setProjects]= useState([]);
    const history = useHistory();
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
        history.push(`project/details/${value}`)
    };

    

    useEffect(() => {
        getAllGuitarProjects()
    }, []);

    return (
        <Card className="m-2 p-2 w-50 mx-auto header">
    
            <CardBody className="font">
                <Link to={`/project/add`}>
                <p>Create a New Project </p>
                </Link>
            </CardBody>
            
            <CardBody >            
                    <select value={projects.Id} name="projectId" id="projectId" onChange={handleInputChange} className='form-control'>
                    <option  value="0">Select an Existing Project</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    </select>
                
            </CardBody>
        </Card>
    );

};

export default Home;
import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllProjectTasksFromCurrentUser } from "../../modules/projectManager";

import Post from "./Post";

const AllPostsFromCurrentUser= () => {
    const [myTasks, setMyTasks ] = useState([]);
   const { id } = useParams(); 

    const getAllProjectTasksFromUser = () => {
        getAllProjectTasksFromCurrentUser(id)
        .then(posts => setPosts(posts))
        
    }

    useEffect(() => {
        getAllPostsFromUser()
       getAllProjectTasksFromCurrentUser();
    }, []);

    return (
     <>
         
            <h2 className="text-center">My Tasks</h2> 
            <div className="col m-2 p-2 justify-content-center">
                {}
                
                {myTasks.map((t) => (
                    <Post post={post} key={post.id} showEditAndDelete={true}/>
                ))}
            </div>
           
        </>
    );
};

export default AllPostsFromCurrentUser;
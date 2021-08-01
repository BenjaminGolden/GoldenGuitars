import { getToken } from "./authManager";

const baseUrl = '/api/project';

export const getAllProjects = () => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get project.");
            }
        });
    });
};

export const getProjectById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get post details.");
            }
        });
    });
};

// export const getAllProjectTasksFromCurrentUser = (id) => {
//     return getToken().then((token) => {

//         return fetch(`${baseUrl}/myTasks/${id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error("An unknown error occurred while trying to get your project .");
//             }
//         });
//     });
// };

export const addProject = (project) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new project.");
            }
        });
    });
};

export const deleteProject = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateProject = (editedProject) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedProject.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedProject)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this project.');
            }
        })

    });
};
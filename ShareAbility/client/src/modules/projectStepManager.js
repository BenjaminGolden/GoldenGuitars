import { getToken } from "./authManager";

const baseUrl = '/api/ProjectStep';


export const getAllProjectSteps = (id) => {
    return getToken().then((token) => {
     
        return fetch(`${baseUrl}/project/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get ProjectStep.");
            }
        });
    });
};

export const getProjectStepById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
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

export const addProjectStep = (ProjectStep) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ProjectStep)
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

export const deleteProjectStep = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateProjectStep = (editedProjectStep) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedProjectStep.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedProjectStep)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this project.');
            }
        })

    });
};
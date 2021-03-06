import { getToken } from "./authManager";

const baseUrl = '/api/projectNotes';

export const getAllProjectNotesbyProjectId = (id) => {
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
                throw new Error("An unknown error occurred while trying to get project notes.");
            }
        });
    });
};

export const getProjectNoteById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/singleNote/${id}`, {
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

export const addProjectNote = (projectNote) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectNote)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new note.");
            }
        });
    });
};

export const deleteProjectNote = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateProjectNote = (editedProjectNote) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedProjectNote.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedProjectNote)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this note.');
            }
        })

    });
};
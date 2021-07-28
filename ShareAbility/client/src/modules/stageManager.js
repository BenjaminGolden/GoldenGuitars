import { getToken } from "./authManager";

const baseUrl = '/api/stage';

export const getAllStages = (id) => {
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
                throw new Error("An unknown error occurred while trying to get project.");
            }
        });
    });
};

export const getStageById = (id) => {
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

// export const getAllStages = () => {
//     return getToken().then((token) => {

//         return fetch(`${baseUrl}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error("An unknown error occurred while trying to get your projects.");
//             }
//         });
//     });
// };

export const addStage = (stage) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stage)
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

export const deleteStage = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateStage = (editedStage) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedStage.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedStage)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this project.');
            }
        })

    });
};
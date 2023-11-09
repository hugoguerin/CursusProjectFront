const URL = "http://localhost:8001/levels";

export const getAllLevels = async () => {
    const method = "get";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch(URL, { method, headers })
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => {
            return null;
        });
};

export const getLevelById = async (id) => {
    const method = "get";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch(`${URL}/${id}`, { method, headers })
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => {
            return null;
        });
};

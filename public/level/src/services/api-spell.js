const URL = "http://localhost:3000/spells";

export const getAllSpells = async () => {
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

export const getSpellById = async (id) => {
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

/**
 * 
 * @param {Number[]} ids 
 * @returns 
 */
export const getSpellsByIds = async (ids) => {
    const method = "get";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const queryIds = ids.map((id) => `id=${id}`).join("&");

    console.log(URL + "?" + queryIds);

    return fetch(`${URL}?${queryIds}`, { method, headers })
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => {
            return null;
        });
};

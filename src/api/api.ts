import axios from "axios";

const BASE_URL = "https://randomuser.me/api/";

async function getUsers(results: number = 1)  {
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            results
        }
    });

    return response.data;

}

export const api = {
    getUsers,
};


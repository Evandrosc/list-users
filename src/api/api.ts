import axios from "axios";
import { User } from "../Tipagem/User";

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


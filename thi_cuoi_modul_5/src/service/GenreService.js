import axios from "axios";

const URL_GENRE = 'http://localhost:3080/genre';

export const getAllGenre = async () => {
    try {
        const response = await axios.get(URL_GENRE);
        return response.data;
    } catch (err) {
        return [];
    }
}
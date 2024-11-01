import axios from "axios";

const URL_BOOK = 'http://localhost:3080/book';
const URL_GENRE = 'http://localhost:3080/genre';

export const getAllBooks = async (name, genre) => {
    try {
        let URL = `${URL_BOOK}?_sort=quality&_order=desc&`;
        if (name) {
            URL += `name_like=${name}&`;
        }
        if (genre) {
            URL += `genre=${genre}&`;
        }
        const res = await axios.get(URL);
        console.log(res.data);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const saveBook = async (book) => {
    try {
        await axios.post(URL_BOOK, book);
        return true;
    } catch (err) {
        return false;
    }
}

export const checkBookCodeExists = async (code) => {
    try {
        const res = await axios.get(`${URL_BOOK}?code=${code}`);
        return res.data.length > 0;
    } catch (error) {
        return false;
    }
};
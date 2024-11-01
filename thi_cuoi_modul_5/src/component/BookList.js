import {useEffect, useState} from "react";
import * as bookService from "../service/BookService";
import * as genreService from "../service/GenreService";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import moment from "moment/moment";

function BookList() {

    const [books, setBook] = useState([]);
    const [genres, setGenre] = useState([]);
    const [name, setName] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        getAllBooks(name, selectedGenre);
    }, [name, selectedGenre]);

    const getAllBooks = async (name, genre) => {
        const books = await bookService.getAllBooks(name, genre);
        setBook(books);
        if (books.length === 0) {
            toast.info("Không có sách!!!");
        }
        const genreData = await genreService.getAllGenre();
        setGenre(genreData);
    }


    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <a href="/" className="title">
                    <h1>Quản lý Sách</h1>
                </a>
                <Link className="btn btn-success" to="/create">Thêm mới</Link>
            </div>
            <p className="mt-4"><strong>Tìm kiếm sách theo tên : </strong></p>
            <input className="w-25 form-control" value={name} placeholder="Nhập tên sách cần tìm kiếm"
                   onChange={(e) => setName(e.target.value)}/>

            <div className="mt-4">
                <p><strong>Tìm kiếm sách theo thể loại : </strong></p>
                <div className="mb-3">
                    <select
                        id="genre"
                        className="form-control w-50"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Chọn thể loại</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="table table-success table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã sách</th>
                    <th>Tên sách</th>
                    <th>Thể loại</th>
                    <th>Ngày nhập</th>
                    <th>Số lượng</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => {
                    const BookGenre = Number(book.genre);
                    const genre = genres.find(gen => gen.id === BookGenre);

                    return (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.code}</td>
                            <td>{book.name}</td>
                            <td>{genre ? genre.name : 'Không xác định'}</td>
                            <td>{moment(book.input, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                            <td>{book.quality}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
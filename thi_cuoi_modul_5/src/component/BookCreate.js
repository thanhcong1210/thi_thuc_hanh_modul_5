import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as bookService from "../service/BookService";
import * as genreService from "../service/GenreService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {getAllGenre} from "../service/GenreService";

function BookCreate() {
    const [genres, setGenre] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        code: "",
        name: "",
        genre: 0,
        quality: 0,
        input: ""
    }

    useEffect(() => {
        getGenres();
    }, [])

    const getGenres = async () => {
        try {
            const genre = await getAllGenre();
            setGenre(genre);
        } catch (error) {
            console.log("Lỗi rồi", error);
        }
    }

    const objectValid = {
        code: Yup.string().required("Mã sách không được để trống")
            .matches(/^BO-\d{4}$/, "Mã sách nhập chưa đúng định dạng (yêu cầu : BO - XXXX với X là các chữ số"),
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự")
            .max(200, "Tên không được vượt quá 100 ký tự"),
        quality: Yup.number()
            .required("Số lượng không được để trống")
            .min(1, "Số lượng phải lớn hơn 0")
            .typeError("Số lượng phải là một số hợp lệ"),
        input: Yup.date()
            .required("Ngày nhập sách không được để trống")
            .max(new Date(), "Ngày nhập sách không được lớn hơn ngày hiện tại"),
        genre: Yup.string().required("Không được để trống thể loại sách")
    }

    const saveBook = async (values, {setSubmitting}) => {
        try {
            const isCodeExists = await bookService.checkBookCodeExists(values.code);
            if (isCodeExists) {
                toast.error("Mã sách đã tồn tại vui lòng chọn mã khác");
                setSubmitting(false);
                return;
            }
            values.quality = +values.quality;
            values.genre = +values.genre;

            let isSuccess = await bookService.saveBook(values);
            if (isSuccess) {
                toast.success("Thêm sách thành công!!!")
                navigate("/");
            } else {
                toast.error("Thêm sách thất bại!!!");
            }
        } catch (error) {
            toast.error("Lỗi xảy ra khi thêm sách rồi!!!")
        } finally {
            setSubmitting(false)
        }
    };


    return (
        <div className="container">
            <h1>Thêm mới sách</h1>
            <Formik initialValues={initialValues} onSubmit={saveBook} validationSchema={Yup.object(objectValid)}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Mã sách</label>
                        <Field
                            name="code"
                            type="text"
                            className="form-control w-50"
                            id="code"
                        />
                        <ErrorMessage className="error" name="code" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên sách</label>
                        <Field
                            name="name"
                            type="text"
                            className="form-control w-50"
                            id="name"
                        />
                        <ErrorMessage className="error" name="name" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="genre" className="form-label">Chọn thể loại sách</label>
                        <Field as="select" name="genre" className="form-control w-50" id="genre">
                            <option value="">Chọn thể loại</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="error" name="genre" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quality" className="form-label">Số lượng</label>
                        <Field
                            name="quality"
                            type="number"
                            className="form-control w-50"
                            id="quality"
                        />
                        <ErrorMessage className="error" name="quality" component="p"></ErrorMessage>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Ngày Nhập sách</label>
                        <Field
                            name="input"
                            type="date"
                            className="form-control w-50"
                            id="input"
                        />
                        <ErrorMessage className="error" name="input" component="p"></ErrorMessage>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <button type='submit' className="btn btn-primary">Thêm mới sách</button>
                        <Link className="btn btn-success" to="/">Trở lại trang chủ</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default BookCreate;
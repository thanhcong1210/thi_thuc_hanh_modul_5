import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import BookList from "../../thi_cuoi_modul_5/src/component/BookList";
import BookCreate from "../../thi_cuoi_modul_5/src/component/BookCreate";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/create" element={<BookCreate/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;

import {Main} from "../main/Main";
import {BrowserRouter, Route, Routes} from "react-router";
import {ShopCart} from "../shopCart/ShopCart";
import {Header} from "../header/Header";
import {NotFoundPage} from "../../../shared/components/ui/notFoundPage/NotFoundPage";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <BrowserRouter>
            <>
                <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/cart" element={<ShopCart/>}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                />
            </>
        </BrowserRouter>
    )
}

export default App

import {Main} from "../main/Main";
import {BrowserRouter, Route, Routes} from "react-router";
import {ShopCart} from "../shopCart/ShopCart";
import {Header} from "../header/Header";
import {NotFoundPage} from "../../../shared/components/ui/notFoundPage/NotFoundPage";

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
            </>
        </BrowserRouter>
    )
}

export default App

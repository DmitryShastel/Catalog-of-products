import {Header} from "../header/Header";
import {Product} from "../product/Product";
// import styles from "../main/main.module.css";


export const Main = () => {
    return (
        <div>
            <Header/>
            <>
                <Product/>
            </>
            <div>pagination</div>
        </div>
    );
};

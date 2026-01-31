import styles from "../product/product.module.css";

const products = [
    { id: 1, title: "Продукт 1", price: 1000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 2, title: "Продукт 2", price: 2000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 3, title: "Продукт 3", price: 3000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 4, title: "Продукт 4", price: 4000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 5, title: "Продукт 5", price: 5000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 6, title: "Продукт 6", price: 6000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 7, title: "Продукт 7", price: 7000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 8, title: "Продукт 8", price: 8000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 9, title: "Продукт 9", price: 9000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 10, title: "Продукт 10", price: 10000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 11, title: "Продукт 11", price: 11000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
    { id: 12, title: "Продукт 12", price: 12000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNrihys-PEjNbnt4NGj7TYMSp96OD71Yx1Q&s" },
];



export const Product = () => {
    return (
        <div className={styles.content}>
            {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                    />
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>{product.price} ₽</p>
                </div>
            ))}
        </div>
    );
};

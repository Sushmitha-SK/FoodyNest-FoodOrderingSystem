import React from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";


const ProductCard = (props) => {
    const { _id, title, description, price, imageUrl, foodTags, isAvailabe, rating, createdAt, updatedAt } = props.item;
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                _id,
                title,
                imageUrl,
                price,
            })
        );
    };

    return (
        <div className="product__item">
            <div className="product__img">
                <Link to={`/foods/${_id}`}><img src={imageUrl} alt="product-img" className="w-50" /></Link>
            </div>

            <div className="product__content">
                <h5>
                    <Link to={`/foods/${_id}`}>{title}</Link>
                </h5>
                <div className=" d-flex align-items-center justify-content-between ">
                    <span className="product__price">${price}</span>
                    <button onClick={addToCart} className="addTOCart__btn" >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
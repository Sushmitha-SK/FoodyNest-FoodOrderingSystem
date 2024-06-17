import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { cartActions } from "../store/shopping-cart/cartSlice";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../styles/product-details.css";
import { getAllFoodItems } from "../api/foodApi";

const FoodDetails = () => {
    const [tab, setTab] = useState("desc");
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [reviewMsg, setReviewMsg] = useState("");
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        handleAllFoodItems();
    }, [])


    const handleAllFoodItems = async () => {
        try {
            const getAllFoodItemData = await getAllFoodItems();
            setAllFoodItems(getAllFoodItemData?.foods || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all food items:', error);
            setLoading(false);
        }
    };

    const product = allFoodItems.find((product) => product._id === id) || [];
    const [previewImg, setPreviewImg] = useState(product.imageUrl);
    const { _id, title, description, price, imageUrl, category, foodTags } = product;
    const relatedProduct = products.filter((item) => category === item.category);
    const relatedProducts = allFoodItems.filter((item) => item.category === category && item._id !== id);
    console.log('relatedProducts Details', relatedProducts)

    const addItem = () => {
        dispatch(
            cartActions.addItem({
                _id,
                title,
                price,
                imageUrl,
            })
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(enteredName, enteredEmail, reviewMsg);
    };

    useEffect(() => {
        setPreviewImg(product.imageUrl);
    }, [product]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title="Product-details">
            <CommonSection title={title} />
            <section>
                <Container>
                    <Row>
                        <Col lg="2" md="2">
                            <div className="product__images">
                                <div className="img__item mb-3" onClick={() => setPreviewImg(product.imageUrl)}>
                                    <img src={product.imageUrl} alt="" className="w-50" />
                                </div>

                            </div>
                        </Col>
                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                <img src={previewImg} alt="" className="w-100" />
                            </div>
                        </Col>
                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{title}</h2>
                                <p className="product__price">
                                    Price: <span>${price}</span>
                                </p>
                                <p className="category mb-5">
                                    Category: <span>{foodTags}</span>
                                </p>
                                <button onClick={addItem} className="addTOCart__btn">
                                    Add to Cart
                                </button>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6 className={`${tab === "desc" ? "tab__active" : ""}`} onClick={() => setTab("desc")}>
                                    Description
                                </h6>
                                <h6 className={`${tab === "rev" ? "tab__active" : ""}`} onClick={() => setTab("rev")}>
                                    Review
                                </h6>
                            </div>
                            {tab === "desc" ? (
                                <div className="tab__content">
                                    <p>{description}</p>
                                </div>
                            ) : (
                                <div className="tab__form mb-3">
                                    <div className="review pt-5">
                                        <p className="user__name mb-0">John Doe</p>
                                        <p className="user__email">john1@gmail.com</p>
                                        <p className="feedback__text">Great product</p>
                                    </div>
                                    <form className="form" onSubmit={submitHandler}>
                                        <div className="form__group">
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                onChange={(e) => setEnteredName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form__group">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                onChange={(e) => setEnteredEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form__group">
                                            <textarea
                                                rows={5}
                                                placeholder="Write your review"
                                                onChange={(e) => setReviewMsg(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="addTOCart__btn">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Col>
                        <Col lg="12" className="mb-5 mt-4">
                            <h2 className="related__Product-title">You might also like</h2>
                        </Col>
                        {relatedProducts.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item._id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default FoodDetails;

import React, { useState } from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from './../components/UI/login/LoginModal';
import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const isLoggedIn = useSelector((state) => state.login.data !== null && state.login.data.length !== 0);
    const userData = useSelector((state) => state.login.data !== null && state.login.data);
    console.log('userdata', userData.user)

    const dispatch = useDispatch();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const navigate = useNavigate()

    const proceedToCheckout = async () => {
        if (totalAmount === 0) {
            toast.warning('Please add items to your cart before proceeding to checkout.');
            return;
        }
        if (isLoggedIn) {
            console.log("Proceeding to checkout...");

            navigate('/checkout')
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <Helmet title="Cart">
            <CommonSection title="Your Cart" />
            <section>
                <Container>

                    <Row>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <Col lg="12">
                            {cartItems.length === 0 ? (
                                <h5 className="text-center">Your cart is empty</h5>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <Tr item={item} key={item.id} />
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4">
                                <h6>
                                    Subtotal: $
                                    <span className="cart__subtotal">{totalAmount}</span>
                                </h6>
                                <p>Taxes and shipping will calculate at checkout</p>
                                <div className="cart__page-btn">
                                    <button className="addTOCart__btn me-4">
                                        <Link to="/foods">Continue Shopping</Link>
                                    </button>
                                    <button className="addTOCart__btn" onClick={proceedToCheckout}>
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {!isLoggedIn && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}

        </Helmet>
    );
};

const Tr = (props) => {
    const { _id, title, price, imageUrl, quantity, totalPrice } = props.item;
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(cartActions.deleteItem(_id));
    };

    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={imageUrl} alt="" />
            </td>
            <td className="text-center">{title}</td>
            <td className="text-center">${price}</td>
            <td className="text-center">{quantity}</td>
            <td className="text-center cart__item-del">
                <i className="ri-delete-bin-line" onClick={deleteItem}></i>
            </td>
        </tr>
    );
};

export default Cart;

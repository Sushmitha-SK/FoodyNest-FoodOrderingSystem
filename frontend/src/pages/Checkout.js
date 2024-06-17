import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/checkout.css";
import { loadStripe } from '@stripe/stripe-js';
import { placeOrder } from "../api/orderApi";

const Checkout = () => {
    const [enterName, setEnterName] = useState("");
    const [enterEmail, setEnterEmail] = useState("");
    const [enterNumber, setEnterNumber] = useState("");
    const [enterCountry, setEnterCountry] = useState("");
    const [enterCity, setEnterCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [user_Details, setUser_Details] = useState({});
    const [shipping_Details, setShipping_Details] = useState({});
    const [order_ID, setOrder_ID] = useState("")

    const cartItems = useSelector((state) => state.cart.cartItems);
    const userId = useSelector((state) => state.login.data.user._id);
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const shippingCost = 50;
    const totalAmount = cartTotalAmount + Number(shippingCost);
    let token = localStorage.getItem("token");

    const cart = cartItems.map((item) => ({
        foodId: item._id,
        title: item.title,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        price: item.totalPrice,
    }));

    const cartDetails = cartItems.map((item) => ({
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.totalPrice,
        quantity: item.quantity,
    }));

    const submitHandler = async (e) => {
        e.preventDefault();

        const userDetails = {
            name: enterName,
            email: enterEmail,
            phone: enterNumber,
            country: enterCountry,
            city: enterCity,
            postalCode: postalCode,
        };
        setUser_Details(userDetails);

        const shippingAddress = {
            name: enterName,
            email: enterEmail,
            phone: enterNumber,
            country: enterCountry,
            city: enterCity,
            postalCode: postalCode,
        }
        setShipping_Details(shippingAddress)

        const orderData = {
            cart: cart,
            userDetails: userDetails,
            userId: userId,
            paymentMethod: "card"
        };


        try {
            const placeFoodOrder = await placeOrder(orderData)
            console.log('placeFoodOrder', placeFoodOrder)
            if (placeFoodOrder.success === true) {
                let orderID = placeFoodOrder?.newOrder?._id
                console.log('OrderID', orderID)
                setOrder_ID(orderID)
                console.log('OrderID State Val', order_ID)
                handlePaymentGateway(orderID)
            }
        } catch (error) {
            console.log('Error', error)
        }
    };

    const handlePaymentGateway = async (orderID) => {
        const stripe = await loadStripe("pk_test_51Ng6d5SJiEXEh1tFGZC9awcU3O0vJ1b1sYFcMCH2rJEqGWwVHK2qDyrIt47mZu6MnYDORtQf6IDMY36FyhWSy3cS00cfkkV9gG");
        const body = {
            products: cartDetails,
            orderId: orderID
        }
        const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`

        }
        const response = await fetch("https://foodynest-backend.onrender.com/api/v1/payments/pay-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout" />
            <section>
                <Container>
                    <Row>
                        <Col lg="8" md="6">
                            <h6 className="mb-4">Shipping Address</h6>
                            <form className="checkout__form" onSubmit={submitHandler}>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        value={enterName}
                                        onChange={(e) => setEnterName(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={enterEmail}
                                        onChange={(e) => setEnterEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="number"
                                        placeholder="Phone number"
                                        required
                                        value={enterNumber}
                                        onChange={(e) => setEnterNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        required
                                        value={enterCountry}
                                        onChange={(e) => setEnterCountry(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={enterCity}
                                        onChange={(e) => setEnterCity(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="number"
                                        placeholder="Postal code"
                                        required
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="addTOCart__btn">
                                    Place Order
                                </button>
                            </form>
                        </Col>

                        <Col lg="4" md="6">
                            <div className="checkout__bill">
                                <h6 className="d-flex align-items-center justify-content-between mb-3">
                                    Subtotal: <span>${cartTotalAmount}</span>
                                </h6>
                                <h6 className="d-flex align-items-center justify-content-between mb-3">
                                    Shipping: <span>${shippingCost}</span>
                                </h6>
                                <div className="checkout__total">
                                    <h5 className="d-flex align-items-center justify-content-between">
                                        Total: <span>${totalAmount}</span>
                                    </h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Checkout;
import React, { useRef, useEffect } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

const nav__links = [
    {
        display: "Home",
        path: "/home",
    },
    {
        display: "Foods",
        path: "/foods",
    },
    {
        display: "Cart",
        path: "/cart",
    },
    {
        display: "Track Order",
        path: "/orderdetails",
    },
];

const Header = () => {
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.login.data !== null && state.login.data.length !== 0);
    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

    const toggleCart = () => {
        dispatch(cartUiActions.toggle());
    };

    const handleAuthentication = () => {
        if (isAuthenticated) {
            navigate('/profile')
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h5>Foody Nest</h5>
                    </div>

                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={(navClass) =>
                                        navClass.isActive ? "active__menu" : ""
                                    }
                                >
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="nav__right d-flex align-items-center gap-4">
                        <span className="cart__icon" onClick={toggleCart}>
                            <i className="ri-shopping-basket-line"></i>
                            <span className="cart__badge">{totalQuantity}</span>
                        </span>

                        <span className="user" onClick={handleAuthentication}>
                            <i className="ri-user-line"></i>
                        </span>

                        <span className="mobile__menu" onClick={toggleMenu}>
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import stripeIcon from '../../assets/images/stripeImg.png'
import "../../styles/footer.css";


const date = new Date();
const year = date.getFullYear();
const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="3" md="4" sm="6">
                        <div className=" footer__logo text-start">
                            <img src={logo} alt="logo" />
                            <h5>Foody Nest</h5>
                            <p>Have a Break. Have a Food order.</p>
                        </div>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Contact Us</h5>
                        <ListGroup className="deliver__time-list">
                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <p>Our main restaurant is located on Street 231, NYC</p>
                            </ListGroupItem>
                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Phone:  +00 1234567890</span>
                            </ListGroupItem>

                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Email: help@example.com</span>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col lg="6" md="6">
                        <p className="copyright__text">
                            &copy; 2024, Foody Nest
                        </p>
                    </Col>
                    <Col lg="6" md="6">
                        <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                            <p className="m-0">Fully secured payment gateways by trusted companies</p>

                            <span >
                                {" "}
                                <img src={stripeIcon} style={{ width: '50px', height: '25px' }} />

                            </span>
                        </div>

                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

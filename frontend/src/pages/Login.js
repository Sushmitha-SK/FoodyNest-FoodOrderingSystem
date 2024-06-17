import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginDetails } from '../store/user/userAuthSlice';

const Login = () => {
    const [emailid, setEmailid] = useState('')
    const [password, setPassword] = useState('')
    const [authToken, setAuthToken] = useState('')
    const [userInfo, setUserInfo] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        const loginData = await loginUser(emailid, password)
        try {
            if (loginData) {
                setAuthToken(loginData?.data.token);
                localStorage.setItem('token', loginData?.data.token);
                dispatch(loginDetails(loginData?.data));
                setUserInfo(loginData?.data);

                toast.success('Logged in successfully');
                navigate('/home');
            }
            else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Helmet title="Login">
            <CommonSection title="Login" />
            <section>
                <Container>
                    <ToastContainer
                        position="top-center"
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
                    <Row>
                        <Col lg="6" md="6" sm="12" className="m-auto text-center">
                            <form className="form mb-5 rounded-2" onSubmit={submitHandler}>
                                <div className="form__group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={emailid}
                                        onChange={(e) => setEmailid(e.target.value)}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="addTOCart__btn">
                                    Login
                                </button>
                            </form>
                            <Link to="/register">
                                Don't have an account? Create an account
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Login;
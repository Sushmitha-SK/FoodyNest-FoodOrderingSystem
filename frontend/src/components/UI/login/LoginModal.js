import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../styles/login-modal.css'
import { loginUser } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { loginDetails } from "../../../store/user/userAuthSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useState('')
    const [userInfo, setUserInfo] = useState([])

    const dispatch = useDispatch()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = await loginUser(email, password)
        console.log('logindata', loginData)
        try {
            if (loginData) {
                setAuthToken(loginData?.data.token);
                localStorage.setItem('token', loginData?.data.token);
                dispatch(loginDetails(loginData?.data));
                setUserInfo(loginData?.data);

                toast.success('Logged in successfully');
                handleClose();
            }
            else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>

            <Modal isOpen={show} centered toggle={handleClose}>
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
                <ModalHeader toggle={handleClose}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email address</Label>
                            <Input type="email" id="email" value={email} onChange={handleEmailChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                        </FormGroup>
                        <Button type="submit" block className="loginmodal_btn">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default LoginModal;

import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from "reactstrap";
import '../styles/profile.css'
import { getUserDetailsByUserID, updateUserProfile } from '../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { clearLoginDetails, loginDetails } from '../store/user/userAuthSlice';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        dispatch(loginDetails(clearLoginDetails))
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmLogout = () => {
        handleLogout();
        closeModal();
    };

    const userLoginData = useSelector((state) => state.login.data !== null && state.login.data);
    const userID = userLoginData?.user?._id

    const [userProfile, setUserProfile] = useState({
        userName: '',
        email: '',
        phone: '',
        address: '',
        profile: ''
    });

    const getProfileDetails = async () => {
        try {
            const userData = await getUserDetailsByUserID(userID)
            if (userData.success === true) {
                setUserProfile(userData?.user)
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        getProfileDetails()
    }, [])

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        setIsEditing(false);
        const updateData = await updateUserProfile(userProfile.userName, userProfile.address, userProfile.phone)
        toast.success('Profile updated successfully');
    };

    return (
        <>
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
            <Helmet title="Profile">
                <CommonSection title="Profile" />
                <section>
                    <Container>
                        <Row>
                            <Col lg="6" md="6" sm="12" className="m-auto text-center">
                                <div className="container">
                                    <div className="main-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex flex-column align-items-center text-center">
                                                            <img src={userProfile.profile} alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                                            <div className="mt-3">
                                                                <h4>{userProfile.userName}</h4>
                                                                <p className="text-muted font-size-sm">{userProfile.address}</p>
                                                                <button
                                                                    className="btn mb-4 btn-primary"
                                                                    style={{ backgroundColor: "#007676", border: "1px solid #007676" }}
                                                                    onClick={handleEditProfile}
                                                                >
                                                                    Edit Profile
                                                                </button>
                                                                <button
                                                                    className="btn btn-outline-primary custom-btn"
                                                                    style={{
                                                                        border: "1px solid #007676",
                                                                        color: "#007676",
                                                                        transition: "background-color 0.3s, color 0.3s",
                                                                    }}
                                                                    onClick={openModal}
                                                                >
                                                                    Logout
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <hr className="my-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="card" style={{ width: '500px' }}>
                                                    <div className="card-body">
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Username</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setUserProfile({ ...userProfile, userName: e.target.value })}
                                                                    value={userProfile.userName}
                                                                    disabled={!isEditing}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Email</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                                    value={userProfile.email}
                                                                    disabled={!isEditing}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Contact No</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                                                                    value={userProfile.phone}
                                                                    disabled={!isEditing}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Address</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                                                                    value={userProfile.address}
                                                                    disabled={!isEditing}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-3" />
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="button"
                                                                    className="btn btn-primary px-4"
                                                                    defaultValue="Save Changes"
                                                                    style={{ backgroundColor: "#007676", border: "1px solid #007676" }}
                                                                    onClick={handleSaveChanges}
                                                                    disabled={!isEditing}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Helmet>
            <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} fontWeight={700}>
                    <span>You are about to Logout</span>
                    <IconButton className="close-button" onClick={closeModal} sx={{ color: '#000' }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <p>You can always log in to Foody Nest and continue where you left off</p>
                </DialogContent>
                <DialogActions>
                    <div style={{ margin: '15px' }}>
                        <Button
                            onClick={closeModal}
                            sx={{
                                background: '#007676',
                                color: '#fff',
                                borderRadius: '10px',
                                margin: '3px',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                '&:hover': {
                                    background: 'transparent',
                                    color: '#007676',
                                    border: '1px solid #007676'
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmLogout}
                            sx={{
                                background: '#FFF0F0',
                                color: '#B80020',
                                borderRadius: '10px',
                                margin: '2px',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                '&:hover': {
                                    background: '#FFD3D3',
                                },
                            }}
                        >
                            Yes, Log Me Out
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Profile

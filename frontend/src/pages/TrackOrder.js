import React, { useEffect, useState } from 'react'
import OrderDetailsStepper from '../components/Stepper/OrderDetailsStepper'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { getOrderDetailsByOrderId } from '../api/orderApi'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/checkout.css";

const TrackOrder = () => {
    const { orderId } = useParams()
    const [orderDetails, setOrderDetails] = useState([])
    const [orderStatus, setOrderStatus] = useState("")
    const [userDetails, setUserDetails] = useState([])
    const [orderedFoodItems, setOrderedFoodItems] = useState([])

    const getOrderDetailsByID = async () => {

        try {
            const getOrderData = await getOrderDetailsByOrderId(orderId)
            console.log('getorderdata', getOrderData?.order)
            setOrderedFoodItems(getOrderData?.order?.foods)

            setOrderDetails(getOrderData?.order)
            setOrderStatus(getOrderData?.order?.status)
            setUserDetails(getOrderData?.order?.userDetails)
        } catch (error) {

        }
    }


    useEffect(() => {
        getOrderDetailsByID()

    }, [orderId])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Date(dateString).toLocaleString('en-GB', options);
    };



    return (
        <Helmet title="Checkout">
            <CommonSection title="Track Your Order" />
            <section>
                <Container>
                    <Row>
                        <Col lg="8" md="6">
                            <h6 className="mb-4">Order Summary</h6>
                            <p>Order ID:{orderDetails?._id}</p>
                            <p>Order Date: {formatDate(orderDetails?.createdAt)}</p>
                            <p>Status: {orderDetails?.status}</p>
                            <OrderDetailsStepper status={orderStatus} />
                        </Col>

                        <Col lg="4" md="6">
                            <div className="checkout__bill">
                                <h6 className="mb-4">User Details</h6>
                                <div>
                                    <p>Name: {userDetails?.name}</p>
                                    <p>Email: {userDetails?.email}</p>
                                    <p>City: {userDetails?.city}</p>
                                    <p>Country: {userDetails?.country}</p>
                                    <p>Pincode: {userDetails?.postalCode}</p>

                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '5%' }}>
                        <Col lg="12">

                            <table className="table table-bordered text-center mx-2">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Item Name</th>
                                        {/* <th>Price</th> */}
                                        <th>Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {orderedFoodItems.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td>{item?._id}</td> */}
                                            <td>{item?.foodId}</td>
                                            <td className="text-center cart__img-box">
                                                <img src={item?.imageUrl} alt="" />
                                            </td>
                                            <td>{item?.title}</td>
                                            <td>{item?.quantity}</td>

                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default TrackOrder
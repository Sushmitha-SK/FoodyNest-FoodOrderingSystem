import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailsByUserId } from '../api/orderApi'
import { useNavigate } from 'react-router-dom'

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([])
    const userLoginData = useSelector((state) => state.login.data !== null && state.login.data);
    const userID = userLoginData?.user?._id

    const getOrderDetails = async () => {
        try {
            const getOrderData = await getOrderDetailsByUserId(userID)
            if (getOrderData.success === true) {
                const sortedOrders = getOrderData.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setOrderDetails(sortedOrders)
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    return (
        <>

            <Helmet title="Cart">
                <CommonSection title="Your Orders" />
                <section>
                    <Container>
                        <Row>
                            <Col lg="12">
                                {orderDetails.length === 0 ? (
                                    <h5 className="text-center">You dont have any food orders</h5>
                                ) : (
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Order Date</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderDetails.map((item) => (
                                                <Tr item={item} key={item.id} />
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                            </Col>
                        </Row>
                    </Container>
                </section>



            </Helmet>
        </>
    )
}

const Tr = (props) => {
    const { _id, createdAt, payment, imageUrl, quantity, totalPrice, status } = props.item;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const viewItem = () => {
        navigate(`/trackorder/${_id}`)
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    return (
        <tr>
            <td>
                {_id}
            </td>

            <td className="text-center">{formatDate(createdAt)}</td>
            <td className="text-center">${payment}</td>
            <td className="text-center">{status}</td>
            <td className="text-center cart__item-del">
                <i className="ri-eye-line" onClick={viewItem}></i>
            </td>
        </tr>
    );
};

export default OrderDetails
import { useEffect, useState } from 'react';
import { updateFoodOrder } from '../api/orderApi';
import '../styles/payment-failure.css'
import { useParams } from 'react-router-dom';

const PaymentFailure = () => {
    let { orderid } = useParams();
    const [orderDetails, setOrderDetails] = useState([])

    const updateOrderStatus = async () => {
        try {
            const status = "pending"
            const update_order = await updateFoodOrder(orderid, status)
            setOrderDetails(update_order?.order)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (orderid) {
            updateOrderStatus();
        }
    }, [orderid]);


    return (
        <div className="failure-container">
            <div className="printer-top"></div>

            <div className="paper-container">
                <div className="printer-bottom"></div>

                <div className="paper">
                    <div className="main-contents">
                        <div className="failure-icon">&#10060;</div>
                        <div className="failure-title">
                            Payment Failed
                        </div>
                        <div className="failure-description">
                            Your payment for an amount of {orderDetails.payment} has been cancelled.
                        </div>
                        <div className="order-details">
                            <div className="order-number-label">Order ID</div>
                            <div className="order-number">{orderDetails._id}</div>
                        </div>
                        <div className="order-footer">Please try again later!</div>
                    </div>
                    <div className="jagged-edge"></div>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailure

import { useEffect, useState } from 'react';
import '../styles/payment-success.css'
import { useNavigate, useParams } from 'react-router-dom';
import { updateFoodOrder } from '../api/orderApi';
import { cartActions } from '../store/shopping-cart/cartSlice';
import { useDispatch } from 'react-redux';

const PaymentSuccess = () => {

    let { orderid } = useParams();
    console.log('orderid Param', orderid)
    const [orderDetails, setOrderDetails] = useState([])


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const updateOrderStatus = async () => {
        try {
            const status = "placed"
            const update_order = await updateFoodOrder(orderid, status)
            setOrderDetails(update_order?.order)
            dispatch(cartActions.clearCart());

        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        if (orderid) {
            updateOrderStatus();
        }
    }, [orderid]);

    const handleClose = () => {
        navigate('/home')
    }


    return (

        <div className="success-container">
            <div className="printer-top"></div>

            <div className="paper-container">
                <div className="printer-bottom"></div>

                <div className="paper">
                    <div className="main-contents">
                        <div className="success-icon">&#10004;</div>
                        <div className="success-title">
                            Payment Complete
                        </div>
                        <div className="success-description">
                            We've received your ${orderDetails.payment} payment.<br/>
                            Order confirmed. Thank you for choosing us. Enjoy your food!
                        </div>
                        <div className="order-details">
                            <div className="order-number-label">Order ID</div>
                            <div className="order-number">{orderDetails._id}</div>
                        </div>
                        <div className="order-footer" onClick={handleClose}>You can close this page!</div>
                    </div>
                    <div className="jagged-edge"></div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
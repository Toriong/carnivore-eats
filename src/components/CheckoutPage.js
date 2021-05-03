import React, { useState, useContext, useEffect } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';

const CheckoutPage = () => {
    const { ordersInfoConfirmed } = useContext(MeatInfoContext)
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;
    return <div className="sections-container">
        <div className="order-review-payment-delivery-section">
            <h1>{confirmedOrdersInfo[confirmedOrdersInfo.length - 1].restaurantName}</h1>
        </div>
        <div className="place-your-order-section">

        </div>
    </div>

}

export default CheckoutPage

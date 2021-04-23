import React, { useContext, useState, useEffect } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import AddOnItem from './AddOnItem'

const SelectedMeatItemViewerToOrderModal = ({ meatItemInfo, restaurantName, addOns }) => {
    const { confirmedPriceTotal, confirmedQuantityOfOrder, confirmedNameOfRestaurantOfOrder, confirmedNameOfOrder, listOfSelectedAddOnPrices } = useContext(MeatInfoContext);
    let [mainMeatCount, setMainMeatCount] = useState(1);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    const [hasOrderTotalIncreased, setHasOrderTotalIncreased] = useState(false);

    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [confirmedOrderPriceTotal, setConfirmedOrderPriceTotal] = confirmedPriceTotal;
    const [confirmedCount, setConfirmedCount] = confirmedQuantityOfOrder;
    const [restaurantOfOrderConfirmed, setRestaurantOfOrderConfirmed] = confirmedNameOfRestaurantOfOrder;
    const [nameOfOrder, setNameOfOrder] = confirmedNameOfOrder;

    // increment will be the mainMeatCount
    const orderTotalChange = (increment) => {
        setMainMeatCount(increment);
        if (mainMeatCount === 0) {
            setMainMeatCount(++mainMeatCount);
            return;
        }
        let selectedAddOnPricesSum = selectedAddOnPrices.reduce((priceA, priceB) => priceA + priceB);
        setOrderTotal(((selectedAddOnPricesSum * mainMeatCount) + (mainMeatCount * meatItemInfo.price)).toFixed(2))
    }

    const confirmedOrder = () => {
        setConfirmedOrderPriceTotal(orderTotal);
        setConfirmedCount(mainMeatCount);
        setRestaurantOfOrderConfirmed(restaurantName);
        setNameOfOrder(meatItemInfo.name)
    };

    useEffect(() => {
        console.log("orderTotal", orderTotal);
    })

    const [isAddOnMenuOpen, setIsAddOnMenuOpen] = useState(false);

    return <div className="selected-food-modal">
        <div className="picture-container">
            <img src={meatItemInfo.image} alt={meatItemInfo.alt} />
        </div>
        <div className="food-title-container">
            <div id="food-item-name">
                <h1>{meatItemInfo.name}</h1>
                <h2>{restaurantName}</h2>
            </div>
        </div>
        {isAddOnMenuOpen ?
            <>
                {/* <div className="add-ons-container"> */}
                <div className="add-ons-text-container">
                    <h2>Add-On:</h2>
                    <div className="arrow-container">
                        <i class="fa fa-angle-down" aria-hidden="true" onClick={() => { setIsAddOnMenuOpen(!isAddOnMenuOpen) }}></i>
                    </div>
                </div>
                {/* </div> */}
                <div className="add-ons-list-container">
                    {addOns.map((addOnItem) => {
                        return <AddOnItem addOnItem={addOnItem} mainMeatCount={mainMeatCount} setOrderTotal={setOrderTotal} meatItemInfoPrice={meatItemInfo.price} orderTotal={orderTotal} />
                    })}
                </div>
            </>
            :
            /* <div className="add-ons-container"> */
            <div className="add-ons-text-container">
                <h2>Add-On:</h2>
                <div className="arrow-container">
                    <i class="fa fa-angle-up" aria-hidden="true" onClick={() => { setIsAddOnMenuOpen(!isAddOnMenuOpen) }}></i>
                </div>
            </div>
            /* </div> */
        }
        <div className="quantity-and-add-to-cart-container">
            <div className="quantity-buttons-container">
                <div className="add-button">
                </div>
                <div className="count" value="1" />
                <div className="minus-button">
                </div>
            </div>
            <div className="add-to-cart-button-quauntity-button-container">
                <div className="quantity-button-container">
                    <div className="plus-sign" onClick={() => { orderTotalChange(++mainMeatCount) }}>
                        +
                    </div>
                    <div className="count">{mainMeatCount}</div>
                    <div className="minus-sign" onClick={() => { orderTotalChange(--mainMeatCount) }}>
                        -
                    </div>
                </div>
                <div className="add-to-cart-button" onClick={confirmedOrder}>
                    <div className="add-option-text">
                        <div>
                            Add
                            </div>
                        <div className="count">{mainMeatCount}</div>
                        <div>
                            to order
                            </div>
                        {orderTotal > meatItemInfo.price ?
                            <div>
                                {orderTotal}
                            </div>
                            :
                            <div>
                                {meatItemInfo.price}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SelectedMeatItemViewerToOrderModal

import React, { useContext, useState, useEffect } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import AddOnItem from './AddOnItem'

const SelectedMeatItemViewerToOrderModal = ({ meatItemInfo, restaurantName, addOns, setIsMeatItemModalOpen }) => {
    const { confirmedPriceTotal, confirmedQuantityOfOrder, confirmedNameOfRestaurantOfOrder, confirmedNameOfOrder, listOfSelectedAddOnPrices, ordersInfoConfirmed, infoOfSelectedAddOnsToOrder, totalPriceOfAddOn, isMeatItemModalOpenFromSearchBar, totalOfCart, ordersSumQuantityTotal } = useContext(MeatInfoContext);

    const [userWantsToOrderMeatFromSearchBar, setUserWantsToOrderMeatFromSearchBar] = isMeatItemModalOpenFromSearchBar;
    const [sumQuantityTotalOfOrders, setSumQuantityTotalOfOrders] = ordersSumQuantityTotal
    const [cartTotal, setCartTotal] = totalOfCart;
    const [totalAddOnPrice, setTotalAddOnPrice] = totalPriceOfAddOn
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;
    const [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder] = infoOfSelectedAddOnsToOrder;
    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [confirmedOrderPriceTotal, setConfirmedOrderPriceTotal] = confirmedPriceTotal;

    // const [confirmedCount, setConfirmedCount] = confirmedQuantityOfOrder;
    const [restaurantOfOrderConfirmed, setRestaurantOfOrderConfirmed] = confirmedNameOfRestaurantOfOrder;
    const [nameOfOrder, setNameOfOrder] = confirmedNameOfOrder;

    let [mainMeatCount, setMainMeatCount] = useState(1);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    const [isAddOnMenuOpen, setIsAddOnMenuOpen] = useState(false);
    const [confirmedAddOnTotalPrice, setConfirmedAddOnTotalPrice] = useState(0);
    const [confirmedAddOnsInfoToOrder, setConfirmedAddOnsInfoToOrder] = useState('');
    const [wasOrderButtonPressed, setWasOrderButtonPressed] = useState(false);
    const [listOfOrderTotals, setListOfOrderTotals] = useState([]);


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
        setConfirmedOrdersInfo([...confirmedOrdersInfo, {
            id: Math.random().toString(16).slice(2).toString(),
            restaurantName: restaurantName,
            infoOfMainMeatItem: meatItemInfo,
            selectedAddOnsInfo: selectedAddOnInfoToOrder,
            allAddOns: addOns,
            orderQuantity: mainMeatCount,
            totalMeatPrice: (mainMeatCount * meatItemInfo.price).toFixed(2),
            totalConfirmedAddOnPrice: selectedAddOnPrices.reduce((addOnA, addOnB) => addOnA + addOnB).toFixed(2),
            totalOrderPrice: orderTotal
        }]);
        setWasOrderButtonPressed(true);
    };

    useEffect(() => {
        if (wasOrderButtonPressed) {
            setSumQuantityTotalOfOrders(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            setSelectedAddOnInfoToOrder([]);
            setTotalAddOnPrice(0);
            setSelectedAddOnPrices([0]);
            setWasOrderButtonPressed(false);
            setIsMeatItemModalOpen(false);
        }
        // setConfirmedAddOnTotalPrice(totalAddOnPrice);
        // setConfirmedAddOnsInfoToOrder(selectedAddOnInfoToOrder);
        console.log(addOns)
    }, [totalAddOnPrice, confirmedAddOnTotalPrice, selectedAddOnInfoToOrder, confirmedAddOnsInfoToOrder, wasOrderButtonPressed, setSelectedAddOnInfoToOrder, setSelectedAddOnPrices, setTotalAddOnPrice, setIsMeatItemModalOpen, confirmedOrdersInfo, listOfOrderTotals, orderTotal, setCartTotal, cartTotal, setSumQuantityTotalOfOrders, addOns])

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
                        return <AddOnItem
                            addOnItem={addOnItem} mainMeatCount={mainMeatCount} setOrderTotal={setOrderTotal} meatItemInfoPrice={meatItemInfo.price}
                            orderTotal={orderTotal}
                        />
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

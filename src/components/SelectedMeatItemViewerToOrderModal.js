import React, { useContext, useState, useEffect } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import AddOnItem from './AddOnItem'

const SelectedMeatItemViewerToOrderModal = ({ meatItemInfo, restaurantName, addOns, setIsMeatItemModalOpen, orderFromCart, confirmedAddOnsInfoInCart }) => {
    const { ordersInfoConfirmed, infoOfSelectedAddOnsToOrder, totalOfCart, cartItemsTotal, displayCartOrderInfoOnModal, isButtonToRemoveOnDom, putUpdateButtonOnDom, openCreateNewCartModal, newOrderDifferentRestaurantName, addOnsAllOfDifferentRes, meatCountForNewOrderOfDifferentRes, newOrderSelectedMeatItemInfoOfDifferentRes, newCurrentOrderTotalPriceOfDifferentRes } = useContext(MeatInfoContext);

    // context values to get the info of the meat item of the new restaurant to start a new cart
    const [currentMeatCountForNewOrderOfDifferentRes, setCurrentMeatCountForNewOrderOfDifferentRes] = meatCountForNewOrderOfDifferentRes;
    const [differentRestaurantNameOfNewOrder, setDifferentRestaurantNameOfNewOrder] = newOrderDifferentRestaurantName;
    const [isCreateNewCartModalOpen, setIsCreateNewCartModalOpen] = openCreateNewCartModal;
    const [allAddOnsForOrderOfDifferentRes, setAllAddOnsForOrderOfDifferentRes] = addOnsAllOfDifferentRes;
    const [selectedMeatItemInfoForNewOrderOfDifferentRes, setSelectedMeatItemInfoForNewOrderOfDifferentRes] = newOrderSelectedMeatItemInfoOfDifferentRes
    const [currentTotalPriceForNewOrderOfDifferentRes, setCurrentTotalPriceForNewOrderOfDifferentRes] = newCurrentOrderTotalPriceOfDifferentRes;

    // the conditional values that will determine what buttons (the update button and remove button) and values will be displayed on the DOM
    const [isUpdateButtonOnDom, setIsUpdateButtonOnDom] = putUpdateButtonOnDom;
    const [isRemoveButtonOnDom, setIsRemoveButtonOnDom] = isButtonToRemoveOnDom
    const [isCartOrderInfoDisplayedOnModal, setIsCartOrderInfoDisplayedOnModal] = displayCartOrderInfoOnModal;

    // the values that will be displayed on the cart UI
    const [numberOfCartItems, setNumberOfCartItems] = cartItemsTotal
    const [cartTotal, setCartTotal] = totalOfCart;

    // will store an array of the 
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;

    const [selectedAddOnsInfoToOrder, setSelectedAddOnsInfoToOrder] = infoOfSelectedAddOnsToOrder;

    let [mainMeatCount, setMainMeatCount] = useState(1);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    const [isAddOnMenuOpen, setIsAddOnMenuOpen] = useState(false);
    const [wasOrderButtonPressed, setWasOrderButtonPressed] = useState(false);
    const [isCartPriceAndQuantityNeededToBeUpdate, setIsCartPriceAndQuantityNeededToBeUpdate] = useState(false);
    const [saveOrdersIntoLocalStorage, setSaveOrdersIntoLocalStorage] = useState(false);



    // increment will be the mainMeatCount
    const orderTotalChange = (increment) => {
        setMainMeatCount(increment);
        if (mainMeatCount === 0) {
            setMainMeatCount(++mainMeatCount);
            return;
        }

        setOrderTotal((mainMeatCount * (selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) + meatItemInfo.price)).toFixed(2))
    }

    const removeOrder = () => {
        setConfirmedOrdersInfo(confirmedOrdersInfo.filter((order) => order.id !== orderFromCart.id));
        // remove the buttons on the modal
        setIsRemoveButtonOnDom(!isRemoveButtonOnDom);
        setIsUpdateButtonOnDom(!isUpdateButtonOnDom);
        // updates the cart. its icon, and saves the changes to the list of orders from the user 
        setIsCartPriceAndQuantityNeededToBeUpdate(true);
        setSaveOrdersIntoLocalStorage(true);

    }

    // will respond to the user pressing the update button
    const updateOrder = () => {
        setConfirmedOrdersInfo(confirmedOrdersInfo.map((order) => {
            if (order.id === orderFromCart.id) {
                return {
                    ...order,
                    selectedAddOnsInfo: selectedAddOnsInfoToOrder,
                    orderQuantity: mainMeatCount,
                    totalMeatPrice: (mainMeatCount * meatItemInfo.price).toFixed(2),
                    totalConfirmedAddOnPrice: selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) * mainMeatCount,
                    totalOrderPrice: orderTotal

                }
            } else if (order.id !== orderFromCart.id) {
                return order;
            }
        }))
        // will update the list that contains all of the user's orders 
        setIsCartPriceAndQuantityNeededToBeUpdate(!isCartPriceAndQuantityNeededToBeUpdate);
        // will take the buttons off of the DOM
        setIsUpdateButtonOnDom(false);
        setSaveOrdersIntoLocalStorage(true);
        console.log("updateOrder was executed")
    }

    // will check if all of the orders in the cart have the same name
    const checkingForMatchingResNamesInCart = () => {
        if (confirmedOrdersInfo.length > 1) {
            // the usage of slice(1): skipping the dummie object @index 1
            if (confirmedOrdersInfo.length === 1) {
                return "empty cart"
            } else if (confirmedOrdersInfo.slice(1).every((order) => order.restaurantName === restaurantName) === false) {
                return false;
            }
        }
    }

    // will respond to the user clicking the 'Add to cart' button on the modal,  willl put the confirmed order into the array that is stored in confirmedOrdersInfo
    const confirmedOrder = () => {
        //  will check if the selected meat item is part of the same restaurant of the orders that are in the cart 
        if (!checkingForMatchingResNamesInCart()) {
            setIsCreateNewCartModalOpen(!isCreateNewCartModalOpen);
            setDifferentRestaurantNameOfNewOrder(restaurantName);
            setAllAddOnsForOrderOfDifferentRes(addOns);
            setCurrentMeatCountForNewOrderOfDifferentRes(mainMeatCount);
            setCurrentTotalPriceForNewOrderOfDifferentRes(orderTotal);
            setSelectedMeatItemInfoForNewOrderOfDifferentRes(meatItemInfo);
            setIsMeatItemModalOpen(false);
            return;
        };
        // if it passes the test, then push the new order into the array that is stored in confirmedOrdersInfo
        setConfirmedOrdersInfo([...confirmedOrdersInfo, {
            id: Math.random().toString(16).slice(2).toString(),
            restaurantName: restaurantName,
            infoOfMainMeatItem: meatItemInfo,
            selectedAddOnsInfo: selectedAddOnsInfoToOrder.slice(0),
            allAddOns: addOns,
            orderQuantity: mainMeatCount,
            totalMeatPrice: (mainMeatCount * meatItemInfo.price).toFixed(2),
            totalConfirmedAddOnPrice: selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) * mainMeatCount,
            totalOrderPrice: orderTotal
        }]);
        setWasOrderButtonPressed(true);
        setSaveOrdersIntoLocalStorage(true);
    };

    // presents the meat item modal with the info of the selected order from the cart
    useEffect(() => {
        if (isCartOrderInfoDisplayedOnModal) {
            setMainMeatCount(orderFromCart.orderQuantity);
            setOrderTotal((orderFromCart.orderQuantity * meatItemInfo.price).toFixed(2))
            if (orderFromCart.selectedAddOnsInfo.length > 0) {
                setIsAddOnMenuOpen(true)
            }
        }
        setIsCartOrderInfoDisplayedOnModal(false)
    }, [isCartOrderInfoDisplayedOnModal, meatItemInfo.price, orderFromCart, setIsCartOrderInfoDisplayedOnModal]);

    // will calculate the total price sum and the total quantity sum of all of the user's orders in the cart
    useEffect(() => {
        if (wasOrderButtonPressed) {
            // the total quantity sum of the user's order
            setNumberOfCartItems(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((numM, numNMinus1) => numM + numNMinus1));
            // the total price sum of the user's order
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            // reseting the state value that keeps track of what the user selected for a  meat item
            setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }]);
            setWasOrderButtonPressed(false);
            setIsMeatItemModalOpen(false);
        }
    }, [selectedAddOnsInfoToOrder, wasOrderButtonPressed, setSelectedAddOnsInfoToOrder, setIsMeatItemModalOpen, confirmedOrdersInfo, orderTotal, setCartTotal, cartTotal, setNumberOfCartItems, addOns, confirmedAddOnsInfoInCart]);

    useEffect(() => {
        if (isCartPriceAndQuantityNeededToBeUpdate) {
            // quantity of user's order
            setNumberOfCartItems(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));

            // total price of user's orders
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }]);
            setIsCartPriceAndQuantityNeededToBeUpdate(!isCartPriceAndQuantityNeededToBeUpdate);
        }
    }, [orderTotal, confirmedOrdersInfo, isCartPriceAndQuantityNeededToBeUpdate, setCartTotal, setIsMeatItemModalOpen, setNumberOfCartItems, setSelectedAddOnsInfoToOrder]);

    // save confirmedOrders into local storage
    useEffect(() => {
        if (saveOrdersIntoLocalStorage) {
            console.log(confirmedOrdersInfo)
            localStorage.setItem("confirmed orders", JSON.stringify(confirmedOrdersInfo));
            setSaveOrdersIntoLocalStorage(false);
            console.log('orders saved')
            setIsMeatItemModalOpen(false);
        }
    }, [saveOrdersIntoLocalStorage]);

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
                <div className="add-ons-text-container">
                    <h2>Add-On:</h2>
                    <div className="arrow-container">
                        <i class="fa fa-angle-down" aria-hidden="true" onClick={() => { setIsAddOnMenuOpen(!isAddOnMenuOpen) }}></i>
                    </div>
                </div>
                <div className="add-ons-list-container">
                    {addOns.map((addOnItem) => {
                        return <AddOnItem
                            addOnItem={addOnItem} mainMeatCount={mainMeatCount} setOrderTotal={setOrderTotal} meatItemInfoPrice={meatItemInfo.price} confirmedAddOnsInfoInCart={confirmedAddOnsInfoInCart}
                        />
                    })}
                </div>
            </>
            :
            <div className="add-ons-text-container">
                <h2>Add-On:</h2>
                <div className="arrow-container">
                    <i class="fa fa-angle-up" aria-hidden="true" onClick={() => { setIsAddOnMenuOpen(!isAddOnMenuOpen) }}></i>
                </div>
            </div>
        }
        {isRemoveButtonOnDom && <div className="remove-item-container" onClick={removeOrder}>
            <h4>
                Remove item
            </h4>
        </div>}
        <div className="quantity-and-add-to-cart-container">
            <div className="add-to-cart-button-quantity-button-container">
                <div className="quantity-buttons-container">
                    <div className="add-button">
                    </div>
                    <div className="count" value="1" />
                    <div className="minus-button">
                    </div>
                </div>
                <div className="quantity-button-container">
                    <div className="plus-sign" onClick={() => { orderTotalChange(--mainMeatCount) }}>
                        -
                    </div>
                    <div className="count">{mainMeatCount}</div>
                    <div className="minus-sign" onClick={() => { orderTotalChange(++mainMeatCount) }}>
                        +
                    </div>
                </div>
                {isUpdateButtonOnDom ? <div className="update-order-button" onClick={updateOrder}>
                    <div>
                        Update
                    </div>
                    <div>
                        Order
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
                    :
                    <div className="add-to-cart-button" onClick={confirmedOrder}>
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
                }
            </div>
        </div>
    </div>
}

export default SelectedMeatItemViewerToOrderModal

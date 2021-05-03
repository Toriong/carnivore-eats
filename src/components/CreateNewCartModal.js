import React, { useState, useEffect, useContext } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const CreateNewCartModal = () => {
    const { ordersInfoConfirmed, meatCountForNewOrderOfDifferentRes, infoOfSelectedAddOnsToOrder, newCurrentOrderTotalPriceOfDifferentRes, newOrderSelectedMeatItemInfoOfDifferentRes, addOnsAllOfDifferentRes, newOrderDifferentRestaurantName, totalOfCart, cartItemsTotal, openCreateNewCartModal } = useContext(MeatInfoContext);

    const [selectedAddOnsInfoToOrder, setSelectedAddOnsInfoToOrder] = infoOfSelectedAddOnsToOrder;
    const [isCreateNewCartModalOpen, setIsCreateNewCartModalOpen] = openCreateNewCartModal;
    const [cartTotal, setCartTotal] = totalOfCart;
    const [numberOfCartItems, setNumberOfCartItems] = cartItemsTotal;
    const [selectedMeatItemInfoForNewOrderOfDifferentRes, setSelectedMeatItemInfoForNewOrderOfDifferentRes] = newOrderSelectedMeatItemInfoOfDifferentRes
    const [differentRestaurantNameOfNewOrder, setDifferentRestaurantNameOfNewOrder] = newOrderDifferentRestaurantName;
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;
    const [allAddOnsForOrderOfDifferentRes, setAllAddOnsForOrderOfDifferentRes] = addOnsAllOfDifferentRes;
    const [currentMeatCountForNewOrderOfDifferentRes, setCurrentMeatCountForNewOrderOfDifferentRes] = meatCountForNewOrderOfDifferentRes;
    const [currentTotalPriceForNewOrderOfDifferentRes, setCurrentTotalPriceForNewOrderOfDifferentRes] =
        newCurrentOrderTotalPriceOfDifferentRes;
    // 1. update the cart info on the DOM
    // 2. save the new confirmed order info into the local storage

    const [updateCartInfo, setUpdateCartInfo] = useState(false);
    const [saveCartOrders, setSaveCartOrders] = useState(false);
    const [resetValuesOfSelectedMeatItemInfo, setResetValuesOfSelectedMeatItemInfo] = useState(false);
    const [saveNewOrder, setSaveNewOrder] = useState(false);

    const createNewCartWithSelectedMeatItem = () => {
        console.log(differentRestaurantNameOfNewOrder);
        setConfirmedOrdersInfo([{
            id: null,
            restaurantName: null,
            infoOfMainMeatItem: null,
            selectedAddOnsInfo: null,
            allAddOns: null,
            orderQuantity: 0,
            totalMeatPrice: 0,
            totalConfirmedAddOnPrice: 0,
            totalOrderPrice: 0
        }, {
            id: Math.random().toString(16).slice(2).toString(),
            restaurantName: differentRestaurantNameOfNewOrder,
            infoOfMainMeatItem: selectedMeatItemInfoForNewOrderOfDifferentRes,
            selectedAddOnsInfo: selectedAddOnsInfoToOrder.slice(0),
            allAddOns: allAddOnsForOrderOfDifferentRes,
            orderQuantity: currentMeatCountForNewOrderOfDifferentRes,
            totalMeatPrice: (currentMeatCountForNewOrderOfDifferentRes * selectedMeatItemInfoForNewOrderOfDifferentRes.price).toFixed(2),
            totalConfirmedAddOnPrice: selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) * currentMeatCountForNewOrderOfDifferentRes,
            totalOrderPrice: currentTotalPriceForNewOrderOfDifferentRes
        }]);
        setUpdateCartInfo(!updateCartInfo);
        setResetValuesOfSelectedMeatItemInfo(!resetValuesOfSelectedMeatItemInfo);
        setSaveNewOrder(!saveNewOrder);
    }

    // update the cart info on the UI
    useEffect(() => {
        if (updateCartInfo) {
            // quantity of user's order
            setNumberOfCartItems(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));

            // total price of user's orders
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }]);
            setUpdateCartInfo(!updateCartInfo);
        }
    }, [updateCartInfo, confirmedOrdersInfo, setCartTotal, setNumberOfCartItems, setSelectedAddOnsInfoToOrder]);

    // reset the values that contained all of the info for the new order:
    useEffect(() => {
        console.log(differentRestaurantNameOfNewOrder);
    })
    useEffect(() => {
        if (resetValuesOfSelectedMeatItemInfo) {
            setSelectedMeatItemInfoForNewOrderOfDifferentRes("");
            setDifferentRestaurantNameOfNewOrder("");
            setAllAddOnsForOrderOfDifferentRes([{ name: null, price: 0 }]);
            setCurrentMeatCountForNewOrderOfDifferentRes(1);
            setCurrentTotalPriceForNewOrderOfDifferentRes(1);
            setResetValuesOfSelectedMeatItemInfo(!resetValuesOfSelectedMeatItemInfo);
        }

    }, [resetValuesOfSelectedMeatItemInfo]);

    // save the new order into the local storage and close this modal
    useEffect(() => {
        if (saveNewOrder) {
            localStorage.setItem("confirmed orders", JSON.stringify(confirmedOrdersInfo));
            setSaveNewOrder(!saveNewOrder)
            console.log('orders saved')
            setIsCreateNewCartModalOpen(!isCreateNewCartModalOpen);
        }
    }, [saveNewOrder, isCreateNewCartModalOpen]);

    return <div className="create-new-cart-modal">
        <div className="close-button-container">
            <div className="close-create-new-cart-modal-button">
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
        <div className="title-of-createNewCartModal-container">
            <h1>
                Create new cart?
            </h1>
        </div>
        <div className="text-container-createNewCartModal">
            <div>
                <p>Your cart contains items from {confirmedOrdersInfo[confirmedOrdersInfo.length - 1].restaurantName}.</p>
            </div>
            <div>
                <p> Create a new cart to add items from {differentRestaurantNameOfNewOrder}.</p>
            </div>
        </div>
        <div className="button-container-createNewCartModal">
            <div id="new-order-button" onClick={createNewCartWithSelectedMeatItem}>
                <p>New Cart</p>
            </div>
        </div>
    </div>

}

export default CreateNewCartModal

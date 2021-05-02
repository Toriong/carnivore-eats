import React, { useContext, useState, useEffect } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import AddOnItem from './AddOnItem'

const SelectedMeatItemViewerToOrderModal = ({ meatItemInfo, restaurantName, addOns, setIsMeatItemModalOpen, orderFromCart, confirmedAddOnsInfoInCart }) => {
    const { ordersInfoConfirmed, infoOfSelectedAddOnsToOrder, totalPriceOfAddOn, totalOfCart, cartItemsTotal, editCartOrder, isButtonToRemoveOnDom, putUpdateButtonOnDom } = useContext(MeatInfoContext);

    const [isUpdateButtonOnDom, setIsUpdateButtonOnDom] = putUpdateButtonOnDom;
    const [isRemoveButtonOnDom, setIsRemoveButtonOnDom] = isButtonToRemoveOnDom
    const [makesEditsToCartOrder, setMakesEditsToCartOrder] = editCartOrder;
    const [numberOfCartItems, setNumberOfCartItems] = cartItemsTotal
    const [cartTotal, setCartTotal] = totalOfCart;
    const [totalAddOnPrice, setTotalAddOnPrice] = totalPriceOfAddOn
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;
    const [selectedAddOnsInfoToOrder, setSelectedAddOnsInfoToOrder] = infoOfSelectedAddOnsToOrder;

    let [mainMeatCount, setMainMeatCount] = useState(1);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    const [isAddOnMenuOpen, setIsAddOnMenuOpen] = useState(false);
    const [confirmedAddOnTotalPrice, setConfirmedAddOnTotalPrice] = useState(0);
    const [confirmedAddOnsInfoToOrder, setConfirmedAddOnsInfoToOrder] = useState('');
    const [wasOrderButtonPressed, setWasOrderButtonPressed] = useState(false);
    const [isCartPriceAndQuantityNeededToBeUpdate, setIsCartPriceAndQuantityNeededToBeUpdate] = useState(false);
    const [saveOrdersIntoLocalStorage, setSaveOrdersIntoLocalStorage] = useState(false);
    const [updateOrderListAfterOrderDeletion, setUpdateOrderListAfterOrderDeletion] = useState(false);



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
        setIsRemoveButtonOnDom(!isRemoveButtonOnDom);
        setIsUpdateButtonOnDom(!isUpdateButtonOnDom);
        setIsCartPriceAndQuantityNeededToBeUpdate(true);
        setSaveOrdersIntoLocalStorage(true);

    }

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
        setIsCartPriceAndQuantityNeededToBeUpdate(!isCartPriceAndQuantityNeededToBeUpdate);
        setIsUpdateButtonOnDom(false);
        setSaveOrdersIntoLocalStorage(true);
        console.log("updateOrder was executed")
    }

    const confirmedOrder = () => {
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

    // present the meat item modal with the info of the order from the cart
    useEffect(() => {
        if (makesEditsToCartOrder) {
            setMainMeatCount(orderFromCart.orderQuantity);
            setOrderTotal((orderFromCart.orderQuantity * meatItemInfo.price).toFixed(2))
            if (orderFromCart.selectedAddOnsInfo.length > 0) {
                setIsAddOnMenuOpen(true)
            }
        }
        setMakesEditsToCartOrder(false)
    }, [makesEditsToCartOrder, meatItemInfo.price, orderFromCart, setMakesEditsToCartOrder]);

    useEffect(() => {
        if (wasOrderButtonPressed) {
            setNumberOfCartItems(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }]);
            setWasOrderButtonPressed(false);
            setIsMeatItemModalOpen(false);
        }
    }, [totalAddOnPrice, confirmedAddOnTotalPrice, selectedAddOnsInfoToOrder, confirmedAddOnsInfoToOrder, wasOrderButtonPressed, setSelectedAddOnsInfoToOrder, setTotalAddOnPrice, setIsMeatItemModalOpen, confirmedOrdersInfo, orderTotal, setCartTotal, cartTotal, setNumberOfCartItems, addOns, confirmedAddOnsInfoInCart]);

    useEffect(() => {
        if (isCartPriceAndQuantityNeededToBeUpdate) {
            setNumberOfCartItems(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));
            setCartTotal(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
            setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }]);
            setIsCartPriceAndQuantityNeededToBeUpdate(!isCartPriceAndQuantityNeededToBeUpdate);
        }
    }, [orderTotal, confirmedOrdersInfo, isCartPriceAndQuantityNeededToBeUpdate, setCartTotal, setIsMeatItemModalOpen, setNumberOfCartItems, setSelectedAddOnsInfoToOrder]);

    // save confirmedOrders into local storage

    // save the array after deleting the selected order
    // create state value that if true 
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

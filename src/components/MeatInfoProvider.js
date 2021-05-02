import React, { useState, createContext, useEffect } from 'react'


export const MeatInfoContext = createContext();


export const MeatInfoProvider = (props) => {
    const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);
    const [selectedRestaurants, setSelectedRestaurants] = useState('')
    const [confirmedOrderPriceTotal, setConfirmedOrderPriceTotal] = useState('');
    const [nameOfOrder, setNameOfOrder] = useState('');
    let [confirmedQuantityOfOrders, setConfirmedQuantityOfOrders] = useState(0);
    const [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen] = useState(false)
    const [userWantsToOrderMeatFromSearchBar, setUserWantsToOrderMeatFromSearchBar] = useState(false);
    const [meatItemToOrderModal, setMeatItemToOrderModal] = useState('');
    const [openMeatItemModalFromSearchContainer, setOpenMeatItemModalFromSearchContainer] = useState(false);
    const [orderMeatItemOrGoToRestaurantMenuModal, setOrderMeatItemOrGoToRestaurantMenuModal] = useState('');
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = useState(false);
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = useState('');
    const [selectedAddOnPrices, setSelectedAddOnPrices] = useState([0]);
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = useState(JSON.parse(localStorage.getItem("confirmed orders")) === null ? [{
        id: null,
        restaurantName: null,
        infoOfMainMeatItem: null,
        selectedAddOnsInfo: null,
        allAddOns: null,
        orderQuantity: 0,
        totalMeatPrice: 0,
        totalConfirmedAddOnPrice: 0,
        totalOrderPrice: 0
    }] : JSON.parse(localStorage.getItem("confirmed orders")));
    const [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder] = useState([{ name: null, price: 0 }]);
    const [totalAddOnPrice, setTotalAddOnPrice] = useState(0);
    const [cartTotal, setCartTotal] = useState(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
    const [numberOfCartItems, setNumberOfCartItems] = useState(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((priceN, priceNMinus1) => priceN + priceNMinus1));
    const [makesEditsToCartOrder, setMakesEditsToCartOrder] = useState(false)
    const [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder] = useState(false);
    const [isRemoveButtonOnDom, setIsRemoveButtonOnDom] = useState(false);
    const [isUpdateButtonOnDom, setIsUpdateButtonOnDom] = useState(false);
    const [isUserOnCheckoutPage, setIsUserOnCheckoutPage] = useState(false);



    return <MeatInfoContext.Provider value={{
        confirmedPriceTotal: [confirmedOrderPriceTotal, setConfirmedOrderPriceTotal],
        quantityOfOrdersConfirmed: [confirmedQuantityOfOrders, setConfirmedQuantityOfOrders],
        confirmedNameOfRestaurantOfOrder: [selectedRestaurants, setSelectedRestaurants],
        confirmedNameOfOrder: [nameOfOrder, setNameOfOrder],
        openResultsContainer: [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen],
        isMeatItemModalOpenFromSearchBar: [userWantsToOrderMeatFromSearchBar, setUserWantsToOrderMeatFromSearchBar],
        selectedMeatItemToOrderModal: [meatItemToOrderModal, setMeatItemToOrderModal],
        fromSearchContainerOpenMeatItemModal: [openMeatItemModalFromSearchContainer, setOpenMeatItemModalFromSearchContainer],
        goToRestaurantOrOrderMeatItem: [orderMeatItemOrGoToRestaurantMenuModal, setOrderMeatItemOrGoToRestaurantMenuModal],
        isGoToResaurantMenuOrOrderMeatItemModalOpen: [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen],
        meatItemInfoSelectedFromSearchBar: [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar],
        listOfSelectedAddOnPrices: [selectedAddOnPrices, setSelectedAddOnPrices],
        totalPriceOfAddOn: [totalAddOnPrice, setTotalAddOnPrice],
        ordersInfoConfirmed: [confirmedOrdersInfo, setConfirmedOrdersInfo],
        infoOfSelectedAddOnsToOrder: [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder],
        totalOfCart: [cartTotal, setCartTotal],
        cartItemsTotal: [numberOfCartItems, setNumberOfCartItems],
        editCartOrder: [makesEditsToCartOrder, setMakesEditsToCartOrder],
        findSumOfConfirmedAddOnsOfCartOrder: [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder],
        isButtonToRemoveOnDom: [isRemoveButtonOnDom, setIsRemoveButtonOnDom],
        putUpdateButtonOnDom: [isUpdateButtonOnDom, setIsUpdateButtonOnDom],
        CheckoutPageUserIsOn: [isUserOnCheckoutPage, setIsUserOnCheckoutPage]
    }}>
        {props.children}
    </MeatInfoContext.Provider>
}

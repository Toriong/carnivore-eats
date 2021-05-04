import React, { useState, createContext, useEffect } from 'react'


export const MeatInfoContext = createContext();


export const MeatInfoProvider = (props) => {
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

    // this state value store all of the orders that the user selected of a restaurant
    // will check if there's anything in the local storage
    // if not, the default value will be a dummie object
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
    // find the price sum of the cart
    const [cartTotal, setCartTotal] = useState(confirmedOrdersInfo.map((order) => parseFloat(order.totalOrderPrice)).reduce((price1, priceN) => (price1 + priceN)));
    // the quantity sum of the cart
    const [numberOfCartItems, setNumberOfCartItems] = useState(confirmedOrdersInfo.map((order) => order.orderQuantity).reduce((numN, numNMinus1) => numN + numNMinus1));
    const [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder] = useState(false);

    // the remove, update button, and makeEditsToCartOrder are context values because the determination of their values must be available in the NavBar component and the SelectedMeatItemViewerToOrderModal
    const [isRemoveButtonOnDom, setIsRemoveButtonOnDom] = useState(false);
    const [isUpdateButtonOnDom, setIsUpdateButtonOnDom] = useState(false);
    const [isCartOrderInfoDisplayedOnModal, setIsCartOrderInfoDisplayedOnModal] = useState(false)

    const [isUserOnCheckoutPage, setIsUserOnCheckoutPage] = useState(false);
    const [isCreateNewCartModalOpen, setIsCreateNewCartModalOpen] = useState(false);
    const [differentRestaurantNameOfNewOrder, setDifferentRestaurantNameOfNewOrder] = useState("");
    const [allAddOnsForOrderOfDifferentRes, setAllAddOnsForOrderOfDifferentRes] = useState([{ name: null, price: 0 }]);
    const [currentMeatCountForNewOrderOfDifferentRes, setCurrentMeatCountForNewOrderOfDifferentRes] = useState(1);
    const [currentTotalPriceForNewOrderOfDifferentRes, setCurrentTotalPriceForNewOrderOfDifferentRes] = useState(0)
    const [selectedMeatItemInfoForNewOrderOfDifferentRes, setSelectedMeatItemInfoForNewOrderOfDifferentRes] = useState("")



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
        ordersInfoConfirmed: [confirmedOrdersInfo, setConfirmedOrdersInfo],
        infoOfSelectedAddOnsToOrder: [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder],
        totalOfCart: [cartTotal, setCartTotal],
        cartItemsTotal: [numberOfCartItems, setNumberOfCartItems],
        displayCartOrderInfoOnModal: [isCartOrderInfoDisplayedOnModal, setIsCartOrderInfoDisplayedOnModal],
        findSumOfConfirmedAddOnsOfCartOrder: [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder],
        isButtonToRemoveOnDom: [isRemoveButtonOnDom, setIsRemoveButtonOnDom],
        putUpdateButtonOnDom: [isUpdateButtonOnDom, setIsUpdateButtonOnDom],
        checkoutPageUserIsOn: [isUserOnCheckoutPage, setIsUserOnCheckoutPage],
        openCreateNewCartModal: [isCreateNewCartModalOpen, setIsCreateNewCartModalOpen],
        newOrderDifferentRestaurantName: [differentRestaurantNameOfNewOrder, setDifferentRestaurantNameOfNewOrder],
        addOnsAllOfDifferentRes: [allAddOnsForOrderOfDifferentRes, setAllAddOnsForOrderOfDifferentRes],
        meatCountForNewOrderOfDifferentRes: [currentMeatCountForNewOrderOfDifferentRes, setCurrentMeatCountForNewOrderOfDifferentRes],
        newCurrentOrderTotalPriceOfDifferentRes: [currentTotalPriceForNewOrderOfDifferentRes, setCurrentTotalPriceForNewOrderOfDifferentRes],
        newOrderSelectedMeatItemInfoOfDifferentRes: [selectedMeatItemInfoForNewOrderOfDifferentRes, setSelectedMeatItemInfoForNewOrderOfDifferentRes]

    }}>
        {props.children}
    </MeatInfoContext.Provider>
}

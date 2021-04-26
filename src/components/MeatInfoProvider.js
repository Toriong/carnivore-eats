import React, { useState, createContext } from 'react'


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
    const [namesOfTheSelectedAddOns, setNamesOfTheSelectedAddOns] = useState([])
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = useState([]);
    const [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder] = useState([]);
    const [totalAddOnPrice, setTotalAddOnPrice] = useState(0);
    const [cartTotal, setCartTotal] = useState('');
    const [sumQuantityTotalOfOrders, setSumQuantityTotalOfOrders] = useState(0);



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
        listOfSelectedAddOnNames: [namesOfTheSelectedAddOns, setNamesOfTheSelectedAddOns],
        ordersInfoConfirmed: [confirmedOrdersInfo, setConfirmedOrdersInfo],
        infoOfSelectedAddOnsToOrder: [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder],
        totalOfCart: [cartTotal, setCartTotal],
        ordersSumQuantityTotal: [sumQuantityTotalOfOrders, setSumQuantityTotalOfOrders]
    }}>
        {props.children}
    </MeatInfoContext.Provider>
}

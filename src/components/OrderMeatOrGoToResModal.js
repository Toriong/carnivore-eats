import React, { useContext, useEffect, useState } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';
import { Link } from 'react-router-dom';


// meatItemInfo
// restaurantInfo
const OrderMeatOrGoToResModal = () => {
    const { meatItemInfoSelectedFromSearchBar, isMeatItemModalOpenFromSearchBar, openResultsContainer, isGoToResaurantMenuOrOrderMeatItemModalOpen } = useContext(MeatInfoContext);
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = meatItemInfoSelectedFromSearchBar
    const [userWantsToOrderMeatFromSearchBar, setUserWantsToOrderMeatFromSearchBar] = isMeatItemModalOpenFromSearchBar;
    const [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen] = openResultsContainer;
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = isGoToResaurantMenuOrOrderMeatItemModalOpen;
    useEffect(() => {
        console.log("selectedMeatItemInfoFromSearchBar.restaurantInfo", selectedMeatItemInfoFromSearchBar.restaurantInfo.add_ons);
    })
    console.log("selectedMeatItemInfoFromSearchBar.meatItemInfo", selectedMeatItemInfoFromSearchBar.meatItemInfo);
    return <div className="isOrderThisItemOrGoToRestaurantModal-modal">
        <div className="isOrderThisItemOrGoToRestaurantModal-title">
            <h4>Order the {selectedMeatItemInfoFromSearchBar.meatItemInfo.name} from {selectedMeatItemInfoFromSearchBar.restaurantInfo.domDisplayName} or view all available meats from {selectedMeatItemInfoFromSearchBar.restaurantInfo.domDisplayName} ?</h4>
        </div>
        <div className="isOrderThisItemOrGoToRestaurantModal-order-button" onClick={() => {
            setUserWantsToOrderMeatFromSearchBar(true);
            setIsSearchResultsContainerOpen(false);
            setIsOrderMeatItemOrGoToRestaurantMenuModalOpen(false);
        }}>
            Order {selectedMeatItemInfoFromSearchBar.meatItemInfo.name}
        </div>
        <Link to={`/menu/${selectedMeatItemInfoFromSearchBar.restaurantInfo.urlParams}`} onClick={() => {
            setIsSearchResultsContainerOpen(false);
            setIsOrderMeatItemOrGoToRestaurantMenuModalOpen(false)
        }}>
            View {selectedMeatItemInfoFromSearchBar.restaurantInfo.domDisplayName}'s Menu
        </Link>
    </div>

}

export default OrderMeatOrGoToResModal

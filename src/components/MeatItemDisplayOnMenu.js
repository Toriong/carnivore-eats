import React, { useState, useEffect, useContext } from 'react';
import { MeatInfoContext } from './MeatInfoProvider';
import SelectedMeatItemViewerToOrderModal from './SelectedMeatItemViewerToOrderModal'
import 'font-awesome/css/font-awesome.min.css'




const MeatItemDisplayOnMenu = ({ meatItemInfo, addOns, restaurantName, isMainMeatsMenuDisplayedOnDom, meatItemModalWasOpenedFromSearchContainer }) => {
    const { listOfSelectedAddOnPrices } = useContext(MeatInfoContext);
    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [isMeatItemModalOpen, setIsMeatItemModalOpen] = useState(false);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    let [mainMeatCount, setMainMetCount] = useState(1);

    const cancelOrder = () => {
        setMainMetCount(1);
        setOrderTotal(meatItemInfo.price);
        setIsMeatItemModalOpen(false);
        setSelectedAddOnPrices([0]);
    }

    return isMeatItemModalOpen ? <>
        <div className="blocker" onClick={cancelOrder} />
        {isMainMeatsMenuDisplayedOnDom ? <div className="main-meats-menu-display">
            <div className="name-and-price-container">
                <h4>{meatItemInfo.name}</h4>
                <h6>${meatItemInfo.price}</h6>
            </div>
            <div className="main-meats-image">
                {meatItemInfo.image}
            </div>
        </div> : null}
        {/* meat item modal */}
        <SelectedMeatItemViewerToOrderModal
            meatItemInfo={meatItemInfo}
            restaurantName={restaurantName}
            addOns={addOns}
            setIsMeatItemModalOpen={setIsMeatItemModalOpen}
            confirmedAddOnsInfoInCart={[]}
        />
    </>
        :
        meatItemModalWasOpenedFromSearchContainer ? null :
            <div className="main-meats-menu-display" onClick={() => { setIsMeatItemModalOpen(!isMeatItemModalOpen) }}>
                <div className="name-and-price-container">
                    <div className="meat-item-name-container">
                        <h4>{meatItemInfo.name}</h4>
                    </div>
                    <div className="meat-item-price-container">
                        <h6>${meatItemInfo.price}</h6>
                    </div>
                </div>
                <div className="main-meats-image">
                    {meatItemInfo.image}
                </div>
            </div>
}

export default MeatItemDisplayOnMenu;

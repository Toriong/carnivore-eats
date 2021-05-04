import React, { useState, useEffect, useContext } from 'react';
import { MeatInfoContext } from './MeatInfoProvider';
import SelectedMeatItemViewerToOrderModal from './SelectedMeatItemViewerToOrderModal'
import 'font-awesome/css/font-awesome.min.css'




const MeatItemDisplayOnMenu = ({ meatItemInfo, addOns, restaurantName, meatItemModalOpenedOnMenuPage, meatItemModalWasOpenedFromMenuPageOfRes }) => {
    const { infoOfSelectedAddOnsToOrder } = useContext(MeatInfoContext);
    const [selectedAddOnsInfoToOrder, setSelectedAddOnInfoToOrder] = infoOfSelectedAddOnsToOrder;

    const [isMeatItemModalOpen, setIsMeatItemModalOpen] = useState(false);
    const [orderTotal, setOrderTotal] = useState(meatItemInfo.price);
    let [mainMeatCount, setMainMetCount] = useState(1);

    const cancelOrder = () => {
        setMainMetCount(1);
        setOrderTotal(meatItemInfo.price);
        setIsMeatItemModalOpen(false);
        setSelectedAddOnInfoToOrder([{ name: null, price: 0 }]);
    }

    return isMeatItemModalOpen ? <>
        {/* this div will cover the whole screen, if clicked, will close the modal */}
        <div className="blocker" onClick={cancelOrder} />
        {/* when the modal is open, the display of the meat item on the UI will stay on the menu page */}
        {meatItemModalOpenedOnMenuPage && <div className="main-meats-menu-display">
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
        </div>}
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
        meatItemModalWasOpenedFromMenuPageOfRes &&
        // when the user clicks on this, then the  meat item  modal will appear on the UI
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

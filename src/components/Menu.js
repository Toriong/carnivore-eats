import React, { useState, useEffect, useContext } from 'react';
import { MeatInfoContext } from './MeatInfoProvider'
import { useParams } from 'react-router-dom';
import meatList from '../data/Meat-Shops.json'
import MeatItemDisplayOnMenu from './MeatItemDisplayOnMenu'




const Menu = () => {
    const { storeName } = useParams();
    const selectedRestaurantInfo = meatList.find((restaurant) => restaurant.urlParams === storeName);

    return <div className="main-meats">
        <div>
            <h1>{selectedRestaurantInfo.domDisplayName}</h1>
            <h2>Main-Meats</h2>
        </div>
        <div className="meatItems-container">
            {selectedRestaurantInfo.main_meats.map((meat) => {
                return <MeatItemDisplayOnMenu meatItemInfo={meat} addOns={selectedRestaurantInfo.add_ons} restaurantName={selectedRestaurantInfo.domDisplayName} isMainMeatsMenuDisplayedOnDom={true} meatItemModalWasOpenedFromSearchContainer={false} />
            })}
        </div>
    </div>
}

export default Menu;

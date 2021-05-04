import React, { useState, useEffect, useContext } from 'react';
import { MeatInfoContext } from './MeatInfoProvider'
import { useParams } from 'react-router-dom';
import meatList from '../data/Meat-Shops.json'
import MeatItemDisplayOnMenu from './MeatItemDisplayOnMenu'



// menu page
// shows all of the meat items of the restaurant 
const Menu = () => {
    const { storeName } = useParams();
    const selectedRestaurantInfo = meatList.find((restaurant) => restaurant.urlParams === storeName);

    return <div className="main-meats">
        {/* insert logo or pic of restaurant here */}
        <div>
            <h1>{selectedRestaurantInfo.domDisplayName}</h1>
            <h2>Main-Meats</h2>
        </div>
        <div className="meatItems-container">
            {selectedRestaurantInfo.main_meats.map((meat) => {
                /* displays all of the meat items of the selected restaurant */
                return <MeatItemDisplayOnMenu meatItemInfo={meat} addOns={selectedRestaurantInfo.add_ons} restaurantName={selectedRestaurantInfo.domDisplayName} meatItemModalOpenedOnMenuPage={true} meatItemModalWasOpenedFromMenuPageOfRes={true} />
            })}
        </div>
    </div>
}

export default Menu;

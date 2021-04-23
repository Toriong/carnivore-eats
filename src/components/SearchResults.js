import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { MeatInfoContext } from './MeatInfoProvider'
import MeatList from '../data/Meat-Shops.json'
import MeatItemDisplayOnMenu from './MeatItemDisplayOnMenu'
import 'font-awesome/css/font-awesome.min.css'


const SearchResults = ({ searchInput }) => {
    const { openResultsContainer, fromSearchContainerOpenMeatItemModal, selectedMeatItemToOrderModal, meatItemInfoSelectedFromSearchBar, isGoToResaurantMenuOrOrderMeatItemModalOpen } = useContext(MeatInfoContext);
    const [openMeatItemModalFromSearchContainer, setOpenMeatItemModalFromSearchContainer] = fromSearchContainerOpenMeatItemModal;
    const [meatItemToOrderModal, setMeatItemToOrderModal] = selectedMeatItemToOrderModal
    const [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen] = openResultsContainer;
    let searchResultsArray = [];
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = isGoToResaurantMenuOrOrderMeatItemModalOpen;
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = meatItemInfoSelectedFromSearchBar;

    // user searches for a restaurant
    MeatList.forEach((restaurant) => {
        restaurant.domDisplayName.toLowerCase().includes(searchInput.toLowerCase()) ? searchResultsArray.push(
            <Link to={`/menu/${restaurant.urlParams}`} onClick={() => { setIsSearchResultsContainerOpen(false) }}>
                <div className="results-container">
                    {/* place logo here */}
                    <div className="results-container-restaurants">
                        {restaurant.domDisplayName}
                    </div>
                    <div className="right-side-arrow">
                        <i class="fa fa-angle-right" aria-hidden="true" />
                    </div>
                </div>
            </Link>) : <>{null}</>

        // if the user searches for a particular meat name
        restaurant.main_meats.forEach((meat) => {
            meat.name.toLowerCase().includes(searchInput.toLowerCase()) ? searchResultsArray.push(
                <div className="results-container" onClick={() => {
                    setIsOrderMeatItemOrGoToRestaurantMenuModalOpen(true)
                    setSelectedMeatItemInfoFromSeachBar({
                        meatItemInfo: meat,
                        restaurantInfo: restaurant
                    })
                }}>
                    <div className="search-symbol-container">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div className="search-meat-info-container">
                        <div className="meat-name-container">
                            {meat.name}
                        </div>
                        <div className="restaurant-name-container">
                            {restaurant.domDisplayName}
                        </div>
                    </div>
                    <div className="right-side-arrow">
                        <i class="fa fa-angle-right" aria-hidden="true" />
                    </div>
                </div>
            )
                : <>{null}</>
        });

        // if the user searches for an add-on:
        restaurant.main_meats.forEach((meat) => {
            restaurant.add_ons.forEach((addOn) => {
                addOn.name.toLowerCase().includes(searchInput.toLowerCase()) ?
                    searchResultsArray.push(
                        <div className="results-container" onClick={() => {
                            setIsOrderMeatItemOrGoToRestaurantMenuModalOpen(true)
                            setSelectedMeatItemInfoFromSeachBar({
                                meatItemInfo: meat,
                                restaurantInfo: restaurant
                            })
                        }} >
                            <div className="search-symbol-container">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                            <div className="search-meat-info-container">
                                <div className="add-on-name-container">
                                    Add "{addOn.name}" to:
                                    </div>
                                <div className="meat-name-container">
                                    {meat.name}
                                </div>
                            </div>
                            <div className="right-side-arrow">
                                <i class="fa fa-angle-right" aria-hidden="true" />
                            </div>
                        </div>
                    )
                    : <>{null}</>
            })
        });

        // if the user types in a generic name
        restaurant.main_meats.forEach((meat) => {
            // check for the existence of the 'genericNames' keyvalue pair
            if (meat.genericNames === undefined) { }
            else if (meat.genericNames !== undefined) {
                meat.genericNames.forEach((name) => {
                    name.toLowerCase().includes(searchInput.toLowerCase()) ?
                        searchResultsArray.push(

                            <div className="results-container" onClick={() => {
                                setIsOrderMeatItemOrGoToRestaurantMenuModalOpen(true)
                                setSelectedMeatItemInfoFromSeachBar({
                                    meatItemInfo: meat,
                                    restaurantInfo: restaurant
                                })
                            }}>
                                <div className="search-symbol-container">
                                    <i class="fa fa-search" aria-hidden="true" />
                                </div>
                                <div className="search-meat-info-container">
                                    <div className="meat-name-container">
                                        {meat.name}
                                    </div>
                                    <div className="restaurant-name-container">
                                        {restaurant.domDisplayName}
                                    </div>
                                </div>
                                <div className="right-side-arrow">
                                    <i class="fa fa-angle-right" aria-hidden="true" />
                                </div>
                            </div>
                        )
                        : <>{null}</>
                })
            }
        })
    })


    return <>
        <div>
            {searchInput.length === 0 ?
                null
                :
                searchResultsArray.length !== 0 ?
                    <>
                        {searchResultsArray}
                    </>
                    :
                    <div>
                        Zero results related to: "{searchInput}"
                    </div>

            }
        </div>
    </>
}

export default SearchResults








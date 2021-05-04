import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { MeatInfoContext } from './MeatInfoProvider'
import MeatList from '../data/Meat-Shops.json'
import MeatItemDisplayOnMenu from './MeatItemDisplayOnMenu'
import 'font-awesome/css/font-awesome.min.css'

//the search input is the input that the user types into in the search bar in the navBar component
const SearchResults = ({ searchInput }) => {

    let searchResultsArray = [];
    const { openResultsContainer, fromSearchContainerOpenMeatItemModal, selectedMeatItemToOrderModal, meatItemInfoSelectedFromSearchBar, isGoToResaurantMenuOrOrderMeatItemModalOpen } = useContext(MeatInfoContext);
    const [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen] = openResultsContainer;
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = isGoToResaurantMenuOrOrderMeatItemModalOpen;
    // setSelectedMeatItemInfoFromSeachBar will get all of the info of the selected meat item from the search bar
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = meatItemInfoSelectedFromSearchBar;

    // if the usesr searches for a restaurant, then put the link to those restaurant into the searchResultsArray
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

        // if the user searches for a particular meat name, then push that (or those) meat item (or meat items) into the searchResultsArray
        restaurant.main_meats.forEach((meat) => {
            // if the search input matches with or is contained in the name of the meat item
            meat.name.toLowerCase().includes(searchInput.toLowerCase()) ? searchResultsArray.push(
                // if the user clicks on the meat item, then a modal (isOrderMeatItemOrGoToRestaurantMenuModalOpen) will appear on the screen asking the user if they want to go the restaurant or order that meat item
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
                // if the search input is contained in the name of the add-on, then push that add-on into the searchResultsArray
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

        // if the user types the type of meat 
        restaurant.main_meats.forEach((meat) => {
            // check for the existence of the 'type of meat item' keyvalue pair
            if (meat.genericNames === undefined) { }
            else if (meat.genericNames !== undefined) {
                meat.genericNames.forEach((name) => {
                    // if the search input is contained in the name of the type of meat, then push all meat items that fall under that name type mto the searchResultsArray.
                    name.toLowerCase().includes(searchInput.toLowerCase()) ?
                        searchResultsArray.push(

                            // if the user clicks on this search result, then the modal isOrderMeatItemOrGoToRestaurantMenuModalOpen will appear on the UI
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
            {/* if there is nothing in the array that contains all of the search results, then display nothing */}
            {searchInput.length === 0 ?
                null
                :
                /* if therer is something, then display the array on the UI */
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








import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import OrderMeatOrGoToResModal from './OrderMeatOrGoToResModal';
import SelectedMeatItemViewerToOrderModal from './SelectedMeatItemViewerToOrderModal'
import { MeatInfoContext } from './MeatInfoProvider';
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom';





const NavBar = () => {
    const { confirmedPriceTotal, confirmedQuantityOfOrder, confirmedNameOfRestaurantOfOrder, confirmedNameOfOrder, openResultsContainer, selectedMeatItemToOrderModal, isMeatItemModalOpenFromSearchBar, isGoToResaurantMenuOrOrderMeatItemModalOpen, meatItemInfoSelectedFromSearchBar } = useContext(MeatInfoContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSideNavBarOpen, setIsSideNavBarOpen] = useState(false);
    const [confirmedQuantity,] = confirmedQuantityOfOrder;
    const [changeQuantityOfOrder, setChangeQuantityOfOrder] = useState(confirmedQuantity)
    const [confirmedOrderPrice,] = confirmedPriceTotal;
    const [nameOfOrder, setNameOfOrder] = confirmedNameOfOrder;
    const [nameOfRestaurant, setNameOfRestaurant] = confirmedNameOfRestaurantOfOrder;
    const [userWantsToOrderMeatFromSearchBar, setUserWantsToOrderMeatFromSearchBar] = isMeatItemModalOpenFromSearchBar;
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = meatItemInfoSelectedFromSearchBar;
    const [isSearchResultsOpen, setIsSearchResultsOpen] = openResultsContainer;
    // const [openMeatItemModal, setOpenMeatItemModal] = openMeatItemModalCondition
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = isGoToResaurantMenuOrOrderMeatItemModalOpen;
    const [meatItemToOrderModal, setMeatItemToOrderModal] = selectedMeatItemToOrderModal;
    const [searchInput, setSearchInput] = useState("");
    const openSearchResultsContainer = (event) => {
        setIsSearchResultsOpen(true);
        setSearchInput(event.target.value);
    }

    const editQuantityNum = (event) => {
        let value = event.target.value;
        setChangeQuantityOfOrder(value);
    }

    return <>
        {isSideNavBarOpen ?
            <>
                <div className="blocker" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }} />
                <div className="side-navbar">
                    <div className="title-container">
                        <h1>Quick Carnivore Eats</h1>
                    </div>
                    <div className="sideBar-menu-container">
                        <div className="home-link">
                            <Link to="/" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }}>
                                HOME/SEARCH RESULTS
                            </Link>
                        </div>
                        <div className="favorites-link-container">
                            <Link to="/favorites" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }}>
                                FAVORITES
                            </Link>
                        </div>
                        <div className="about-link-container">
                            <Link to="/about" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }}>
                                ABOUT
                            </Link>
                        </div>
                        <div className="policy-link-container">
                            <Link to="/policy" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }}>
                                POLICY
                            </Link>
                        </div>
                    </div>
                </div>
            </>
            :
            <div className="hide-side-navbar">

            </div>
        }
        <div className="unfixed-wrapper">
            <div className="navbar">
                <div className="hamburger-menu-container">
                    <div className="hamburger-menu-icon" onClick={() => { setIsSideNavBarOpen(!isSideNavBarOpen) }}>
                        <div id="hamburger-line-1" className="hamburger-line"></div>
                        <div id="hamburger-line-2" className="hamburger-line"></div>
                        <div id="hamburger-line-3" className="hamburger-line"></div>
                    </div>
                </div>
                <div className="logo-container">
                    <div id="quick-text">
                        Quick
            </div>
                    <div id="carnivore-text">
                        Carnivore
                </div>
                    <div id="eats-text">
                        Eats
                </div>
                </div>
                <div className='deliver-or-pick-up-container'>
                    <div className="deliver-or-pick-up-button">
                        <div id="pick-up">
                            Pick-up
                </div>
                        <div id="deliver">
                            Deliver
                </div>
                    </div>
                </div>
                <div className='search-bar-container'>
                    <div className="search-bar-sub-container">
                        <div id="search-icon-container">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                        <input type="text" className="search-input" value={searchInput} onChange={openSearchResultsContainer} />
                    </div>
                    {isSearchResultsOpen ?
                        <div className="search-results-container">
                            {searchInput.length > 0 ? <div>Results related to: "{searchInput}"</div> : <div>Results related to: </div>}
                            <div className="search-results-sub-container">
                                <SearchResults searchInput={searchInput} />
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="cart-container">
                    <div id="cart" onClick={() => { setIsCartOpen(!isCartOpen) }}>
                        <div className="cart-icon">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                        <div id="cart-text">
                            Cart:
                    </div>
                        {confirmedQuantity > 0 ?
                            <div id="number-of-items">
                                {confirmedQuantity}
                            </div>
                            :
                            <div id="number-of-items">
                                0
                        </div>
                        }
                    </div>
                    {isCartOpen ?
                        <div className="cart-modal">
                            <div className="your-order-container">
                                <h1>Your Order</h1>
                            </div>
                            <div className="confirmed-restaurant-of-order-container">
                                <h6>From {nameOfRestaurant}</h6>
                            </div>
                            <div className="order-name-edit-button-quantity-container">
                                <div className="edit-button">
                                    EDIT
                            </div>
                                <div className="quantity-container">
                                    {confirmedQuantity}
                                </div>
                                <div className="name-of-order">
                                    <h4>{nameOfOrder}</h4>
                                </div>
                                <div className="price-of-item">
                                    <p>${confirmedOrderPrice}</p>
                                </div>
                            </div>
                            <div className="proceed-to-checkout-button-container">
                                <div className="checkout-button">
                                    <div className="quantity-confirmed">
                                        <p>{confirmedQuantity}</p>
                                    </div>
                                    <div className="checkout-button-text">
                                        Proceed to Checkout
                                </div>
                                    <div className="total-price">
                                        <p>${confirmedOrderPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>

        {userWantsToOrderMeatFromSearchBar ?
            <>
                <div className="blocker" onClick={() => { setUserWantsToOrderMeatFromSearchBar(false) }} />
                <SelectedMeatItemViewerToOrderModal
                    meatItemInfo={selectedMeatItemInfoFromSearchBar.meatItemInfo}
                    addOns={selectedMeatItemInfoFromSearchBar.restaurantInfo.add_ons}
                    restaurantName={selectedMeatItemInfoFromSearchBar.restaurantInfo.domDisplayName}
                />
            </>
            :
            null
        }
        {isOrderMeatItemOrGoToRestaurantMenuModalOpen ?
            <OrderMeatOrGoToResModal />
            :
            null
        }

    </>
}

export default NavBar

import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import OrderMeatOrGoToResModal from './OrderMeatOrGoToResModal';
import SelectedMeatItemViewerToOrderModal from './SelectedMeatItemViewerToOrderModal'
import { MeatInfoContext } from './MeatInfoProvider';
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom';





const NavBar = () => {
    const { openResultsContainer, isMeatItemModalOpenFromSearchBar, isGoToResaurantMenuOrOrderMeatItemModalOpen, meatItemInfoSelectedFromSearchBar, ordersInfoConfirmed, totalOfCart, cartItemsTotal, editCartOrder, listOfSelectedAddOnPrices, findSumOfConfirmedAddOnsOfCartOrder, infoOfSelectedAddOnsToOrder, isButtonToRemoveOnDom, putUpdateButtonOnDom } = useContext(MeatInfoContext);


    const [isUpdateButtonOnDom, setIsUpdateButtonOnDom] = putUpdateButtonOnDom
    const [isRemoveButtonOnDom, setIsRemoveButtonOnDom] = isButtonToRemoveOnDom;
    const [selectedAddOnsInfoToOrder, setSelectedAddOnsInfoToOrder] = infoOfSelectedAddOnsToOrder;
    const [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder] = findSumOfConfirmedAddOnsOfCartOrder
    const [makesEditsToCartOrder, setMakesEditsToCartOrder] = editCartOrder;
    const [numberOfCartItems, setNumberOfCartItems] = cartItemsTotal;
    const [cartTotal, setCartTotal] = totalOfCart;
    const [confirmedOrdersInfo, setConfirmedOrdersInfo] = ordersInfoConfirmed;
    const [openMeatItemModalFromSearchBar, setOpenMeatItemModalFromSearchBar] = isMeatItemModalOpenFromSearchBar;
    const [selectedMeatItemInfoFromSearchBar, setSelectedMeatItemInfoFromSeachBar] = meatItemInfoSelectedFromSearchBar;
    const [isSearchResultsOpen, setIsSearchResultsOpen] = openResultsContainer;
    const [isOrderMeatItemOrGoToRestaurantMenuModalOpen, setIsOrderMeatItemOrGoToRestaurantMenuModalOpen] = isGoToResaurantMenuOrOrderMeatItemModalOpen;
    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;

    const [isUserOnCheckoutPage, setIsUserOnCheckoutPage] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSideNavBarOpen, setIsSideNavBarOpen] = useState(false);
    const [isMeatItemModalOpenFromCart, setIsMeatItemModalOpenFromCart] = useState(false);
    const [propsForMeatItemModalOpenFromCart, setPropsForMeatItemModalOpenFromCart] = useState('');

    const [searchInput, setSearchInput] = useState("");

    const openSearchResultsContainer = (event) => {
        setIsSearchResultsOpen(true);
        setSearchInput(event.target.value);
    }

    const openMeatItemModalFromCart = (orderInfo, setIsMeatItemModalOpen) => {
        setPropsForMeatItemModalOpenFromCart({
            meatItemInfo: orderInfo.infoOfMainMeatItem,
            addOns: orderInfo.allAddOns,
            restaurantName: orderInfo.restaurantName,
            setIsMeatItemModalOpen: setIsMeatItemModalOpen,
            selectedAddOnsInfo: orderInfo.selectedAddOnsInfo,
            selectedOrderFromCart: orderInfo,
        });
        setIsMeatItemModalOpenFromCart(true);
        setMakesEditsToCartOrder(true);
    };

    const closeCart = () => {
        setIsCartOpen(!isCartOpen);
        setIsUserOnCheckoutPage(true);
    }

    const closeSideNavBar = () => {
        setIsSideNavBarOpen(!isSideNavBarOpen)
        setIsUserOnCheckoutPage(false);
    }

    useEffect(() => {
        console.log(confirmedOrdersInfo);
        // console.log(cartTotal);
        // console.log(numberOfCartItems);
    })


    return <>
        {isSideNavBarOpen ?
            <>
                <div className="blocker" onClick={closeSideNavBar} />
                <div className="side-navbar">
                    <div className="title-container">
                        <h1>Quick Carnivore Eats</h1>
                    </div>
                    <div className="sideBar-menu-container">
                        <div className="home-link">
                            <Link to="/" onClick={closeSideNavBar}>
                                HOME/SEARCH RESULTS
                            </Link>
                        </div>
                        <div className="favorites-link-container">
                            <Link to="/favorites" onClick={closeSideNavBar}>
                                FAVORITES
                            </Link>
                        </div>
                        <div className="about-link-container">
                            <Link to="/about" onClick={closeSideNavBar}>
                                ABOUT
                            </Link>
                        </div>
                        <div className="policy-link-container">
                            <Link to="/policy" onClick={closeSideNavBar}>
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
                {isUserOnCheckoutPage ?
                    <div>
                        <h1>Checkout</h1>
                        <div className="number-of-items">
                            {numberOfCartItems}
                        </div>
                    </div>
                    :
                    <>
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
                                <div className="number-of-items">
                                    {numberOfCartItems}
                                </div>
                            </div>
                            {/* cart modal */}
                            {isCartOpen ?
                                <>
                                    <div className="cart-modal">
                                        <div className="your-order-container">
                                            <h1>{confirmedOrdersInfo[confirmedOrdersInfo.length - 1].restaurantName}</h1>
                                        </div>
                                        {confirmedOrdersInfo.slice(1).map((order) => {
                                            return <>
                                                <div className="order-name-edit-button-quantity-container" onClick={() => {
                                                    openMeatItemModalFromCart(order, setIsMeatItemModalOpenFromCart)
                                                    setComputeConfirmedAddOnsOfCartOrder(true);
                                                    setIsUpdateButtonOnDom(true);
                                                    setIsRemoveButtonOnDom(true);
                                                }}>
                                                    <div className="edit-button">
                                                        EDIT
                                                        </div>
                                                    <div className="quantity-container">
                                                        {order.orderQuantity} X
                                                        </div>
                                                    <div className="name-of-order">
                                                        <h4>{order.infoOfMainMeatItem.name}</h4>
                                                    </div>
                                                    <div className="price-of-item">
                                                        <p>${order.totalOrderPrice}</p>
                                                    </div>
                                                    {order.totalConfirmedAddOnPrice !== 0 && <div className="addOn-container">
                                                        <div className="addOn-title">
                                                            <h5>ADD-ONS</h5>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                ${order.totalConfirmedAddOnPrice.toFixed(2)}
                                                            </p>
                                                        </div>
                                                        {/* addOnsInfo stores the addOns as objects in an array */}
                                                        {order.selectedAddOnsInfo.map((addOn) => <div className="addOn-names">
                                                            <div>
                                                                <h6>{addOn.name}</h6>
                                                            </div>
                                                        </div>
                                                        )}
                                                    </div>}
                                                </div>
                                            </>
                                        })}
                                        <div className="proceed-to-checkout-button-container">
                                            <Link to="/checkoutPage" onClick={closeCart}>
                                                <div className="checkout-button">
                                                    <div className="checkout-button-text">
                                                        Go to checkout
                                                    </div>
                                                    <div className="total-price">
                                                        <p>${cartTotal.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </>
                }

            </div>
        </div>

        {openMeatItemModalFromSearchBar ?
            <>
                <div className="blocker" onClick={() => {
                    setOpenMeatItemModalFromSearchBar(false)
                }} />
                <SelectedMeatItemViewerToOrderModal
                    meatItemInfo={selectedMeatItemInfoFromSearchBar.meatItemInfo}
                    addOns={selectedMeatItemInfoFromSearchBar.restaurantInfo.add_ons}
                    restaurantName={selectedMeatItemInfoFromSearchBar.restaurantInfo.domDisplayName}
                    setIsMeatItemModalOpen={setOpenMeatItemModalFromSearchBar}
                    confirmedAddOnsInfoInCart={[{ name: null, price: 0 }]}
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
        {isMeatItemModalOpenFromCart ?
            <>
                <div className="blocker" onClick={() => {
                    setSelectedAddOnPrices([0]);
                    setIsMeatItemModalOpenFromCart(false);
                    setSelectedAddOnsInfoToOrder([{ name: null, price: 0 }])
                    setIsUpdateButtonOnDom(false);
                    setIsRemoveButtonOnDom(false);
                }} />
                <SelectedMeatItemViewerToOrderModal
                    meatItemInfo={propsForMeatItemModalOpenFromCart.meatItemInfo}
                    addOns={propsForMeatItemModalOpenFromCart.addOns}
                    restaurantName={propsForMeatItemModalOpenFromCart.restaurantName}
                    setIsMeatItemModalOpen={setIsMeatItemModalOpenFromCart}
                    orderFromCart={propsForMeatItemModalOpenFromCart.selectedOrderFromCart}
                    confirmedAddOnsInfoInCart={propsForMeatItemModalOpenFromCart.selectedAddOnsInfo}
                />
            </>
            :
            null
        }

    </>
}

export default NavBar
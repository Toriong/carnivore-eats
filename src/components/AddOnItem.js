import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { MeatInfoContext } from './MeatInfoProvider'

const AddOnItem = ({ addOnItem, mainMeatCount, setOrderTotal, meatItemInfoPrice, confirmedAddOnsInfoInCart }) => {
    // check for matching names in the selectedAddOns and addOnItem.name. If the names match then set boxClicked to true.
    const { listOfSelectedAddOnPrices, listOfSelectedAddOnNames, infoOfSelectedAddOnsToOrder } = useContext(MeatInfoContext);

    const [selectedAddOnsInfoToOrder, setSelectedAddOnInfoToOrder] = infoOfSelectedAddOnsToOrder;

    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [namesOfTheSelectedAddOns, setNamesOfTheSelectedAddOns] = listOfSelectedAddOnNames;


    const [boxClicked, setBoxClicked] = useState(false);
    const [sumOfAddOns, setSumOfAddOns] = useState(0)

    const addOnAddedToOrder = () => {
        setSelectedAddOnInfoToOrder([...selectedAddOnsInfoToOrder, {
            name: addOnItem.name,
            price: addOnItem.price
        }])
        setBoxClicked(!boxClicked);
    }

    // deletes an addOn from user's order
    const addOnTakenOffOrder = (addOnPrice) => {
        setBoxClicked(!boxClicked);
        let delAddOnPriceIndex = selectedAddOnPrices.indexOf(addOnPrice);
        setSelectedAddOnPrices([...selectedAddOnPrices.slice(0, delAddOnPriceIndex), ...selectedAddOnPrices.slice(delAddOnPriceIndex + 1)]);
        setNamesOfTheSelectedAddOns(namesOfTheSelectedAddOns.filter((meatName) => meatName !== addOnItem.name))
        setSelectedAddOnInfoToOrder([...selectedAddOnsInfoToOrder.filter((selectedAddOnsInfo) => selectedAddOnsInfo.name !== addOnItem.name)])
    }
    // useEffect(() => {
    //     if (confirmedAddOnsInfoInCart.length !== 0) {
    //         console.log("confirmedAddOnsInfoInCart is not empty", confirmedAddOnsInfoInCart)
    //     } else if (confirmedAddOnsInfoInCart.length === 0) {
    //         console.log("confirmedAddOnsInfoInCart is empty", confirmedAddOnsInfoInCart)
    //     }
    // }, [confirmedAddOnsInfoInCart])


    // when the meat item modal is open with the order in the cart, the useEffect below will add the prices of the selected add-ons to the total price of the meat items
    // when the meat item modal is closed, set the array that is stored in selectedAddOns to an empty array. 
    useEffect(() => {
        // console.log(confirmedAddOnsInfoInCart);
        // bug with the for-loop
        if (confirmedAddOnsInfoInCart.length !== 0) {
            for (let i = 0; i < confirmedAddOnsInfoInCart.length; ++i) {
                if (confirmedAddOnsInfoInCart[i].name === addOnItem.name) {
                    setBoxClicked(true);
                    addOnAddedToOrder();
                    break;
                }
            }
        } else if (confirmedAddOnsInfoInCart.length === 0) {
            // console.log("selectedAddOnsInfo array is empty")
        }
    }, [confirmedAddOnsInfoInCart, addOnItem]);

    useEffect(() => {
        // have the 'setOrderTotal to run only when boxClicked has changed


        // debugger
        // conditionally render?
        // console.log("selectedAddOnsInfoToOrder", selectedAddOnsInfoToOrder)
        // console.log("sumOfAddOns", sumOfAddOns)
        setOrderTotal(((mainMeatCount * meatItemInfoPrice) + (selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) * mainMeatCount)).toFixed(2));
    }, [boxClicked, mainMeatCount, meatItemInfoPrice, namesOfTheSelectedAddOns, selectedAddOnPrices, setOrderTotal, selectedAddOnsInfoToOrder,]);

    return <div className="add-on">
        <div className="check-container">
            {boxClicked ?
                <FontAwesomeIcon icon={faCheckSquare} onClick={() => { addOnTakenOffOrder(addOnItem.price) }} />
                :
                <FontAwesomeIcon icon={faSquare} onClick={addOnAddedToOrder} />
            }
        </div>
        <div className="add-on-name">
            <h1>{addOnItem.name}</h1>
        </div>
        <div>
            +{addOnItem.price}
        </div>
    </div>
}

export default AddOnItem

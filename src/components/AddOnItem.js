import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { MeatInfoContext } from './MeatInfoProvider'

const AddOnItem = ({ addOnItem, mainMeatCount, setOrderTotal, meatItemInfoPrice, confirmedAddOnsInfoInCart }) => {
    // check for matching names in the selectedAddOns and addOnItem.name. If the names match then set boxClicked to true.
    const { listOfSelectedAddOnPrices, listOfSelectedAddOnNames, infoOfSelectedAddOnsToOrder, totalPriceOfAddOn } = useContext(MeatInfoContext);

    const [totalAddOnPrice, setTotalAddOnPrice] = totalPriceOfAddOn
    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [namesOfTheSelectedAddOns, setNamesOfTheSelectedAddOns] = listOfSelectedAddOnNames;
    const [selectedAddOnInfoToOrder, setSelectedAddOnInfoToOrder] = infoOfSelectedAddOnsToOrder;


    const [boxClicked, setBoxClicked] = useState(false);

    const addOnAddedToOrder = () => {
        setSelectedAddOnInfoToOrder([...selectedAddOnInfoToOrder, {
            name: addOnItem.name,
            price: addOnItem.price
        }])
        setSelectedAddOnPrices([...selectedAddOnPrices, addOnItem.price]);
        setNamesOfTheSelectedAddOns([...namesOfTheSelectedAddOns, addOnItem.name])
        setBoxClicked(!boxClicked);
    }

    const addOnTakenOffOrder = (addOnPrice) => {
        setBoxClicked(!boxClicked);
        let delAddOnPriceIndex = selectedAddOnPrices.indexOf(addOnPrice);
        setSelectedAddOnPrices([...selectedAddOnPrices.slice(0, delAddOnPriceIndex), ...selectedAddOnPrices.slice(delAddOnPriceIndex + 1)]);
        setNamesOfTheSelectedAddOns(namesOfTheSelectedAddOns.filter((meatName) => meatName !== addOnItem.name))
        setSelectedAddOnInfoToOrder([...selectedAddOnInfoToOrder.filter((selectedAddOnsInfo) => selectedAddOnsInfo.name !== addOnItem.name)])
    }

    useEffect(() => {
        console.log(confirmedAddOnsInfoInCart);
        if (confirmedAddOnsInfoInCart.length !== 0) {
            for (let i = 0; i < confirmedAddOnsInfoInCart.length; ++i) {
                if (confirmedAddOnsInfoInCart[i].name === addOnItem.name) {
                    console.log("match");
                    setBoxClicked(true);
                    addOnAddedToOrder();
                    // console.log()
                    // break;
                }
                console.log("no match");
            }
        } else if (confirmedAddOnsInfoInCart.length === 0) {
            console.log("selectedAddOnsInfo array is empty")
        }
    }, [confirmedAddOnsInfoInCart, addOnItem]);

    useEffect(() => {
        // have the 'setOrderTotal to run only when boxClicked has changed

        // save the total price of the add-ons if the user presses the 'order' button
        // setTotalAddOnPrice((selectedAddOnPrices.reduce((priceA, priceB) => priceA + priceB) * mainMeatCount).toFixed(2))

        setOrderTotal(((mainMeatCount * meatItemInfoPrice) +
            // why can't I add the value that is stored in totalAddOnPrice instead?
            selectedAddOnPrices.reduce((priceA, priceB) => priceA + priceB) * mainMeatCount).toFixed(2));
    }, [boxClicked, mainMeatCount, meatItemInfoPrice, namesOfTheSelectedAddOns, selectedAddOnPrices, setOrderTotal, setTotalAddOnPrice]);

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

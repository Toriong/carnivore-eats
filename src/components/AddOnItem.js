import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { MeatInfoContext } from './MeatInfoProvider'

const AddOnItem = ({ addOnItem, mainMeatCount, setOrderTotal, meatItemInfoPrice, orderTotal }) => {
    const { listOfSelectedAddOnPrices, listOfSelectedAddOnNames } = useContext(MeatInfoContext);

    const [boxClicked, setBoxClicked] = useState(false);

    const [selectedAddOnPrices, setSelectedAddOnPrices] = listOfSelectedAddOnPrices;
    const [namesOfTheSelectedAddOns, setNamesOfTheSelectedAddOns] = listOfSelectedAddOnNames;

    const addOnAddedToOrder = () => {
        setSelectedAddOnPrices([...selectedAddOnPrices, addOnItem.price]);
        setNamesOfTheSelectedAddOns([...namesOfTheSelectedAddOns, addOnItem.name])
        setBoxClicked(!boxClicked);
    }

    const addOnTakenOffOrder = (addOnPrice) => {
        let delAddOnPriceIndex = selectedAddOnPrices.indexOf(addOnPrice);
        setSelectedAddOnPrices([...selectedAddOnPrices.slice(0, delAddOnPriceIndex), ...selectedAddOnPrices.slice(delAddOnPriceIndex + 1)]);
        setNamesOfTheSelectedAddOns(namesOfTheSelectedAddOns.filter((meatName) => meatName !== addOnItem.name))
        setBoxClicked(!boxClicked);
    }


    useEffect(() => {
        // console.log(selectedAddOnPrices);
        if (boxClicked || !boxClicked) {
            setOrderTotal(((mainMeatCount * meatItemInfoPrice) + (selectedAddOnPrices.reduce((priceA, priceB) => priceA + priceB) * mainMeatCount)).toFixed(2));
        }
        console.log(namesOfTheSelectedAddOns)
    });

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

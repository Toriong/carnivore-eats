import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { MeatInfoContext } from './MeatInfoProvider'

const AddOnItem = ({ addOnItem, mainMeatCount, setOrderTotal, meatItemInfoPrice, confirmedAddOnsInfoInCart, orderTotal }) => {
    // check for matching names in the selectedAddOns and addOnItem.name. If the names match then set boxClicked to true.
    const { findSumOfConfirmedAddOnsOfCartOrder, infoOfSelectedAddOnsToOrder } = useContext(MeatInfoContext);


    const [computeConfirmedAddOnsOfCartOrder, setComputeConfirmedAddOnsOfCartOrder] = findSumOfConfirmedAddOnsOfCartOrder;
    const [selectedAddOnsInfoToOrder, setSelectedAddOnsInfoToOrder] = infoOfSelectedAddOnsToOrder;




    const [boxClicked, setBoxClicked] = useState(false);
    const [sumOfAddOns, setSumOfAddOns] = useState(0)

    const addOnAddedToOrder = () => {
        setSelectedAddOnsInfoToOrder([...selectedAddOnsInfoToOrder, {
            name: addOnItem.name,
            price: addOnItem.price
        }])
        setBoxClicked(!boxClicked);
    }

    // deletes an addOn from user's order
    const addOnTakenOffOrder = () => {
        setBoxClicked(!boxClicked);
        setSelectedAddOnsInfoToOrder(selectedAddOnsInfoToOrder.filter((addOn) => addOn.name !== addOnItem.name
        ));
    }

    useEffect(() => {
        setOrderTotal(((mainMeatCount * meatItemInfoPrice) + (selectedAddOnsInfoToOrder.map((addOn) => addOn.price).reduce((priceN, priceNPlus1) => priceN + priceNPlus1) * mainMeatCount)).toFixed(2));
    }, [boxClicked, mainMeatCount, meatItemInfoPrice, setOrderTotal, selectedAddOnsInfoToOrder,]);

    useEffect(() => {
        if (confirmedAddOnsInfoInCart.length !== 0 && computeConfirmedAddOnsOfCartOrder) {
            confirmedAddOnsInfoInCart.forEach((addOn) => {
                if (addOn.name === addOnItem.name) {
                    setBoxClicked(true);
                }
            });
        }
    }, [confirmedAddOnsInfoInCart, addOnItem]);

    useEffect(() => {
        // console.log(selectedAddOnsInfoToOrder)
        if (computeConfirmedAddOnsOfCartOrder) {
            setOrderTotal(orderTotal + (mainMeatCount * (confirmedAddOnsInfoInCart.map((addOn) => addOn.price)).reduce((priceN, priceNMinus1) => priceN + priceNMinus1)))
            setSelectedAddOnsInfoToOrder([...selectedAddOnsInfoToOrder, ...confirmedAddOnsInfoInCart.map((addOn) => addOn)])
            setComputeConfirmedAddOnsOfCartOrder(false);
        }
    }, [computeConfirmedAddOnsOfCartOrder, confirmedAddOnsInfoInCart, mainMeatCount, orderTotal, selectedAddOnsInfoToOrder, setComputeConfirmedAddOnsOfCartOrder, setOrderTotal, setSelectedAddOnsInfoToOrder])

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

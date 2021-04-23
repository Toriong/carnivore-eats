import React, { useContext } from 'react'
import { MeatInfoContext } from './MeatInfoProvider';

const Footer = () => {
    const { openResultsContainer } = useContext(MeatInfoContext);
    const [isSearchResultsContainerOpen, setIsSearchResultsContainerOpen] = openResultsContainer
    return <div onClick={() => { setIsSearchResultsContainerOpen(false) }}>
        <div className="separator" />
        <div className="footer">
            <div className="logo-text-containe">
                Quick Carnivore Eats
            </div>
            <div className="info-container">

            </div>
        </div>
    </div>
}

export default Footer

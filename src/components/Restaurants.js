import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MeatInfoContext } from './MeatInfoProvider'
import meatList from '../data/Meat-Shops.json'


const Restaurants = () => {
  return <>
    <div className="restaurants-list-container">
      {/*will display all of the restaurant that are near to the user */}
      {meatList.map((restaurant) => {
        return <Link to={`/menu/${restaurant.urlParams}`}>
          <div className="restaurant-container">
            <div className="image-container">
              <img src={restaurant.image} alt={restaurant.alt} />
            </div>
            <div className="info-container">
              <h5>{restaurant.domDisplayName}</h5>
            </div>
          </div>
        </Link>
      })
      }
    </div>
  </>
}



export default Restaurants;

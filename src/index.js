import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./components/Pages"
import './ccs/index.css';
import './ccs/restaurants.css';
import './ccs/navBar.css';
import './ccs/selectedMeatItemViewerToOrderModal.css'
import './ccs/menu.css'
import './ccs/searchResults.css'
import './ccs/footer.css'
import 'font-awesome/css/font-awesome.min.css'



ReactDOM.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>,
  document.getElementById('root')
);




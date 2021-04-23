import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Restaurants from './Restaurants';
import NavBar from "./NavBar"
import { MeatInfoProvider } from './MeatInfoProvider'
import Footer from './Footer'

const Pages = () => {
    return (
        <Router>
            <MeatInfoProvider>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Restaurants />
                    </Route>
                    <Route path="/menu/:storeName" children={<Menu />} />
                </Switch>
                <Footer />
            </MeatInfoProvider>
        </Router>
    )
}


export default Pages;
import React from 'react';
import "../styles/page-default.scss";
import XRTabs from "../components/tab/xrtab";
import Downdrop from "../components/downdrop";
import Footer from "../components/footer";
const Header = () => {

    return (
        <div className="header-default" >
            <div className="nav-brand">
              XR3 Network
            </div>
            <XRTabs></XRTabs>
            <div className="wrap-account">
                <Downdrop></Downdrop>
            </div>
            <Footer></Footer>
        </div >
    );
}
export default Header;
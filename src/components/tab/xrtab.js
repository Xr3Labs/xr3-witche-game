import React, { useState } from "react";
import Network from '../../pages/network';
import Game from '../../pages/game';
import Assets from "../../pages/assets";
import TabContent from "./tabContent";
import TabNavItem from "./tabNavItem";
import { ToastProvider } from "react-toast-notifications"

const XRTabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="Tabs">
            <TabNavItem title="Assets" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabNavItem title="Network" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabNavItem title="Game" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                <ToastProvider>
                    <TabContent id="tab1" activeTab={activeTab}>
                        <Assets />
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        <Network />
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <Game />
                    </TabContent>
                </ToastProvider>
            </div>
        </div>
    );
};
export default XRTabs;

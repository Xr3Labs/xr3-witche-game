import React from "react";

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
    const handleClick = () => {
        setActiveTab(id);
    };

    const sty = 'tab-line' + title;
    return (
        <div className={activeTab == id ? "asset-tab tab-font" : "tab-fontdefault default-tab"} onClick={handleClick}>
            <span>{title}</span>
            <div className={ activeTab == id ? sty : null}></div>
        </div>

    );
};
export default TabNavItem;



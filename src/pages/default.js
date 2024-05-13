/// default page(unlogged pages)
///
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/page-default.scss';
import LeaseInfo from '../components/defaults/default-networks';
import NoAccount from "../components/defaults/no-accounts";
import Icons from "../resources/index";
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Message } from 'semantic-ui-react';
import config from "../context/config"
import Footer from "../components/footer"

const xr3_explore = config.XR3_EXPLORE;

const DefaultPage = () => {
    const navigate = useNavigate();
    // is there exists polkadot.js extension ?
    const [isExtension, setIsExtension] = useState(1);
    const [existsAccount, setExistsAccount] = useState(1);

    useEffect(() => {
        web3Enable("xr3 network").then((extension) => {
            // no polkadot.js extension
            console.log(extension.length);
            if (extension.length == 0) {
                setIsExtension(0);
            } else {
                web3Accounts().then((accounts) => {
                    // no account in extension
                    if (accounts.length == 0) {
                        setExistsAccount(0)
                    }
                })
            }
        });
    })

    const handle_change = async () => {
        if (isExtension && existsAccount) {
            navigate("/account")
        }
    }
    return (
        <div className="App" >
            <div className="header-default">
                <div className="nav-brand">
                    XR3 Game
                </div>
                <div className="nav-account">
                    <button onClick={() => handle_change()} className="wallet">Connect Wallet</button>
                </div>
            </div>
            {!isExtension ? (
                <Message
                    negative
                    compact
                    floating
                    header="No wallet extension. Please get Polkadot{.js} extension and create a new account."
                    className="message-extension"
                />
            ) : (
                null
            )}

            {isExtension && !existsAccount ? (
                <Message
                    negative
                    compact
                    floating
                    header="your wallet have no accounts, please create a new account."
                    className="message-extension"
                />
            ) : (
                null
            )}

            <div className="text-default">
                <span className="ksm-font">XR3 Network</span>
                <div className="defalt-link">
                    <a href={xr3_explore} target="_blank" className="explorer-sty">View XR3 Network Explorer</a>
                    <img src={Icons.Arrow} className="icon-sty"></img>
                </div>
            </div>
            <LeaseInfo />
            <NoAccount />
            <div className="foot-default">
                    <span className="foot-font">© 2024 XR3 Network</span>
                    <span className="foot-font">·</span>
                    <a className="foot-font">Feedback</a>
            </div>
        </div>
    );
}

export default DefaultPage;
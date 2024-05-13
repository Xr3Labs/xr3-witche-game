/// no accounts
import Icons from "../../resources/index";
import config from "../../context/config"

const polkadot = "polkadot{.js}";

const NoAccount = () => {
    return (
        <div className="body-noacc">
            <div className="noacc-div">
                <span className="noacc-p"> Haven't got an account?</span>
                <span className="noacc-p2">You can create a new account and connect to the Core Pallet with {polkadot} extension.</span>
            </div>
            <div className="btn-link">
                <a href={config.POLKADOT_JS_EXTENSION} target="_blank" className="get-account">Get {polkadot} Extension</a>
                <img src={Icons.Arrow}></img>
            </div>

        </div>
    );
}

export default NoAccount;
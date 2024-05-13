import LeaseInfo from '../components/defaults/default-networks';

const Network = () => {

    return(
        <div className="App" >
            <div className="text-default">
                <p className="ksm-font">XR3 Network</p>
                <a  href="https://polkadot.js.org/apps/?rpc=wss://fraa-flashbox-2958-rpc.a.stagenet.tanssi.network#/accounts"  className="explorer-sty">View XR3 Network Explorer</a>
            </div>
            <LeaseInfo/>
        </div>
    )
}

export default Network;

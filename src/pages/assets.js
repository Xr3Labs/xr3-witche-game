import "../styles/assets.scss"
import TableSingleLine from '../components/table';
import TransDoc from '../components/assets/transfer-doc';
import config from "../context/config"

const xr3_explore = config.XR3_EXPLORE;
const Assets = () => {
    return (
        <div className="App">
            <div className="text-default">
                <p className="ksm-font">Your assets</p>
                <a href={xr3_explore} target="_blank" className="explorer-sty">View XR3 Network Stats</a>
            </div>
            <div className="tb-line">
                <TableSingleLine className="tb"></TableSingleLine>
            </div>
            <TransDoc></TransDoc>
        </div>
    );
}

export default Assets;
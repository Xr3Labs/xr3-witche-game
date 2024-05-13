import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import Icons from '../resources'
import { useSubstrateState } from '../context'
import { formatBalance } from '@polkadot/util'
import config from "../context/config"

const xr3_explore = config.XR3_EXPLORE;
const ksm_network = config.KSM_NETWORK;
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
<br />;

const TableSingleLine = () => {
    const { api, currentAccount } = useSubstrateState()
    const [accBalance, setaccBalance] = useState(0);
    const chainDecimals = api.registry.chainDecimals[0];

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            let unsubscribeAll = null
            console.log(chainDecimals)
            api.query.system.account(current_address, balance_info => {
                const free = formatBalance(balance_info.data.free, {decimals: chainDecimals, withSi: false, forceUnit: '-' });
                setaccBalance(free);
            })
            .then(unsub => {
                unsubscribeAll = unsub
            })
            .catch(console.error)

            // api.query.tokens.accounts(current_address, "KSM", balance_info => {
            //     const free = formatBalance(balance_info.free, { withSi: false, forceUnit: '-' }, chainDecimals);
            //     setKsmBalance(free);
            // })
            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, accBalance, currentAccount, setaccBalance])

    return (
        <Table singleLine className="tb">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <span className="origin">ORIGIN</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <span className="balance">BALANCE</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <span className="token">TOKEN SYMBOL</span>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <div className="pd-body">
                            <img src={Icons.XR3} className="pic"></img>
                            <div className="icon-body2">
                                <a href={xr3_explore} target="_blank" className="lg-p">XR3 Network</a>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div clasName="ba-content">
                            <span className="ba-content1">{accBalance}</span>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <span>XR</span>
                    </Table.Cell>
                </Table.Row>
                {/* <Table.Row>
                        <Table.Cell>
                            <div className="pd-body">
                                <img src={Icons.Litmus} className="pic"></img>
                                <div>
                                    <span className="lg-p">Litmus</span>
                                    <img src={Icons.Arrow} className="icon-link4"></img>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div clasName="ba-content">
                                <span className="ba-content1">0</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell>LIT</Table.Cell>
                    </Table.Row> */}
            </Table.Body>
        </Table>
    );
}

export default TableSingleLine
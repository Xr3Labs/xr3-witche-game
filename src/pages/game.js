/// page reward for contributors to claim
///
import React, { useState, useEffect } from 'react';
import '../styles/assets.scss';
import { useSubstrateState } from '../context';
import { web3FromSource } from '@polkadot/extension-dapp';
import { formatBalance } from '@polkadot/util'
import {
    Message,
} from 'semantic-ui-react'
import Icons from '../resources'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import localStorage from 'localStorage'
import { useToasts } from "react-toast-notifications"

// get current time
const thisTime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mytime = date.toLocaleTimeString();
    // myDate.toLocaleString( );
    var time = year + "/" + month + "/" + day + ' ' + mytime;
    return time;
}

let current_claimed = 0;

const Game = () => {
    const { api, currentAccount } = useSubstrateState();
    // record the current account' status in the contributor list
    const [contributor_status, setContributor_status] = useState(false);
    // is the lowest balance?
    const [accBalance, setAccBalance] = useState(0);
    // default the reward is not claimed
    const [claimedAll, setClaimedAll] = useState(false);
    // Is initialized ? 
    const [initialized, setInitialized] = useState(false);
    const [open, setOpen] = useState(false);
    const [unsub, setUnsub] = useState(null)
    const chainDecimals = api.registry.chainDecimals[0];
    const gameAccount = "5G1phhgRgnkW3kSiibUztT8qm6ZqtrW5mQohcEo6nB9xwoHn"
    const [gameBalance, setGameBalance] = useState(0);

    const { addToast } = useToasts()

    const ErrorMsg = (content) => {
        addToast(content, {
            appearance: 'error', autoDismiss: true,
        })
    }

    const ClaimSuccess = (content) => {
        addToast(content, {
            appearance: 'success', autoDismiss: true,
        })
    }

    const Claiming = (content) => {
        addToast(content, {
            appearance: 'info', autoDismiss: true,
        })
    }

    // this msg will be stored in localstorage
    let msg = {};

    // set the current account's status
    useEffect(() => {
        if (currentAccount) {
            let unsubscribeAll = null

            let current_address = currentAccount.address;
            api.query.system.account(current_address, balance_info => {
                let free = formatBalance(balance_info.data.free, { decimals: chainDecimals, withSi: false, forceUnit: '-' });
                setAccBalance(free);
            })

            api.query.system.account(gameAccount, balance_info => {
                let free = formatBalance(balance_info.data.free, { decimals: chainDecimals, withSi: false, forceUnit: '-' });
                setGameBalance(free);
            })
            .then(unsub => {
                unsubscribeAll = unsub
            })
            .catch(console.error)


            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, currentAccount, gameAccount])

    // get account (include injector accounts)
    const getFromAcct = async () => {
        const {
            address,
            meta: { source, isInjected },
        } = currentAccount

        if (!isInjected) {
            return [currentAccount]
        }
        const injector = await web3FromSource(source)
        return [address, { signer: injector.signer }]
    }

    const handle_change = async () => {
        console.log(`start claim reward.....`);
        let history = new Array();
        const fromAcct = await getFromAcct();
        if (accBalance < 1.0015) {
            ErrorMsg("Insufficient balance in your current account!");
            return;
        }

        // if the current account is in contributor list and not claimed all
        let txExecute = api.tx.balances.transferAllowDeath(gameAccount, 1000000000000);
        Claiming("send 1 xr, wait at least 12s")
        setOpen(!open);
        txExecute.signAndSend(...fromAcct, async result => {
            console.log(`Current status is ${result.status}`);
            if (result.status.isInBlock) {
                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                ClaimSuccess(" claim successfully !")
                let claim_time = thisTime();
                let block = await api.rpc.chain.getBlock(result.status.asFinalized);
                msg.block_number = block.block.header.number;
                msg.claiming_time = claim_time;
                msg.claimed = current_claimed;

                let local_storage = localStorage.getItem(currentAccount.address + "history-reward");
                // if there is no localstorage, we push the new array
                if (local_storage == null) {
                    history.push(msg);
                    localStorage.setItem(currentAccount.address + "history-reward", JSON.stringify(history));
                } else {
                    let new_storage = JSON.parse(local_storage);
                    // if exists, we push into the new item into the array
                    console.log(new_storage);
                    new_storage.push(msg);
                    console.log(new_storage);
                    localStorage.setItem(currentAccount.address + "history-reward", JSON.stringify(new_storage))
                }
                setOpen(false);
            }
        })

        console.log(`claimed all reward ? ${claimedAll}`);
    }

    return (
        <div>
            
            <div className="text-default">
                <p className="ksm-font">XR3 Game!!!</p>
                    <button className="claim-btn" onClick={() => handle_change()}>Fund 1 XR</button>
            </div>

            <div className="text-default description-font">
            In a fantastical universe, a powerful witch finds herself stranded on Earth, yearning to return to her home - the Moon. However, she requires a mysterious and precious currency known as XR Tokens to board a spacecraft back to the Moon.
            <div className="text-default">
                <img src={Icons.Moon} className="game-pic"></img>
            </div>
Fortunately, in this universe, everyone possesses a finite amount of XR Tokens. Now, you will join forces with other players to collectively aid the witch in gathering 10 million XR Tokens, enabling her return to the Moon's embrace.
<div className="text-default">
                {/* <img src={Icons.GameP} className="game-pic"></img> */}
            </div>
Only when you and your fellow players have amassed the required 10 million XR Tokens can the witch embark on her journey back to the Moon, and you will all become heroes of this legendary tale. Are you ready to embrace the challenge? Embark on this adventure filled with mystery and peril, and together with other players, help the witch return to her home!
            
            <div className="text-default-3">
                <img src={Icons.GameP} className="game-pic"></img>
            </div>
            <div className="text-default-balance">
            why just have {gameBalance} XR

            </div>

            </div>
            <div>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >

                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
                
        </div>
    );
}

export default Game;
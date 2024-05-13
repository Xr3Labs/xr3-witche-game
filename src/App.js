import Header from "./pages/header";
import DefaultPage from "./pages/default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Dimmer,
    Loader,
    Grid,
    Sticky,
    Message,
} from 'semantic-ui-react'
import { SubstrateContextProvider, useSubstrateState } from "./context";

function Main () {
    // get substrate context
    const { apiState, apiError, keyringState, currentAccount } = useSubstrateState();

    // loading message
    const loader = text => (
        <Dimmer active>
            <Loader size="small">{text}</Loader>
        </Dimmer>
    )
    // some message to handle error
    const connect_failed = errObj => (
        <Grid centered columns={2} padded>
            <Grid.Column>
                <Message
                    negative
                    compact
                    floating
                    header="Error Connecting to XR3 Network"
                    content={`Connection to websocket '${errObj.target.url}' failed.`}
                />
            </Grid.Column>
        </Grid>
    )

    // 
    if (apiState === 'ERROR') return connect_failed(apiError)
    else if (apiState !== 'READY') return loader('Connecting to XR3 Network')

    if (keyringState !== 'READY') {
        return loader(
            "Loading accounts (please review any extension's authorization)"
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
                <Route path="/account" element={<Header></Header>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default function App () {
    return (
        <SubstrateContextProvider>
            <Main />
        </SubstrateContextProvider>
    )
};

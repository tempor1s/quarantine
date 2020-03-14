import React from 'react';
// @ts-ignore
import {GlobalStyle} from '../global-styles'
import Home from './Home/Home'



const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Home/>
        </>
    )
}

export default App;

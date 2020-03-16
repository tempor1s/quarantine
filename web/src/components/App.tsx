import React from 'react';
import { Router } from 'react-router-dom';
// @ts-ignore
import { GlobalStyle } from '../global-styles';
import history from '../history';
import BaseRouter from '../router';

const App: React.FC = () => {
    return (
        <Router history={history}>
            <GlobalStyle />
            <BaseRouter />
        </Router>
    );
};

export default App;

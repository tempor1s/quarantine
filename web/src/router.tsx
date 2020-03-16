import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';

const BaseRouter = () => {
    return (
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/:id' component={Home} />
        </div>
    );
};

export default BaseRouter;

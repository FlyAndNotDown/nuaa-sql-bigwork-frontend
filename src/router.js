import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IndexPage } from "./page";

export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
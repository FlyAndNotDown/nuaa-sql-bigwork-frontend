import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IndexPage } from "./page";
import { StudentIndexPage } from "./page/student";

export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage}/>
                    <Route exact path={'/student'} component={StudentIndexPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
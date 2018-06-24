import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AdminIndexPage } from "./page/admin/index";
import { AdminStudentPage } from "./page/admin/student";
import { LoginPage } from "./page/login";

export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/login'} component={LoginPage}/>
                    <Route exact path={'/admin'} component={AdminIndexPage}/>
                    <Route exact path={'/admin/student'} component={AdminStudentPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
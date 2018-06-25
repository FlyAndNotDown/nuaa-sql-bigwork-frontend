import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AdminIndexPage } from "./page/admin/index";
import { AdminStudentIndexPage } from "./page/admin/student/index";
import { IndexPage } from "./page/index";
import { AdminClassIndexPage } from "./page/admin/class";

export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage}/>
                    <Route exact path={'/admin'} component={AdminIndexPage}/>
                    <Route exact path={'/admin/student/'} component={AdminStudentIndexPage}/>
                    <Route exact path={'/admin/class/'} component={AdminClassIndexPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

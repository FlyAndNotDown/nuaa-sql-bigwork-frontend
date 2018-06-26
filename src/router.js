import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AdminIndexPage } from "./page/admin/index";
import { AdminStudentIndexPage } from "./page/admin/student/index";
import { IndexPage } from "./page/index";
import { AdminClassIndexPage } from "./page/admin/class";
import { StudentIndexPage } from "./page/student";
import { StudentInfoIndexPage } from "./page/student/info";
import { StudentSelectIndexPage } from "./page/student/select";
import {StudentClassIndexPage} from "./page/student/class";

export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage}/>

                    <Route exact path={'/admin'} component={AdminIndexPage}/>
                    <Route exact path={'/admin/student/'} component={AdminStudentIndexPage}/>
                    <Route exact path={'/admin/class/'} component={AdminClassIndexPage}/>

                    <Route exact path={'/student'} component={StudentIndexPage}/>
                    <Route exact path={'/student/info/'} component={StudentInfoIndexPage}/>
                    <Route exact path={'/student/select/'} component={StudentSelectIndexPage}/>
                    <Route exact path={'/student/class/'} component={StudentClassIndexPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

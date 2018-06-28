import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { AdminIndexPage } from "./page/admin/index";
import { AdminStudentIndexPage } from "./page/admin/student/index";
import { IndexPage } from "./page/index";
import { AdminClassIndexPage } from "./page/admin/class";
import { StudentIndexPage } from "./page/student";
import { StudentInfoIndexPage } from "./page/student/info";
import { StudentSelectIndexPage } from "./page/student/select";
import { StudentClassIndexPage } from "./page/student/class";
import { AdminClassDetailPage } from "./page/admin/class/detail";
import {AdminScriptIndexPage} from "./page/admin/script";

export class MainRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage}/>

                    <Route exact path={'/admin'} component={AdminIndexPage}/>
                    <Route exact path={'/admin/student/'} component={AdminStudentIndexPage}/>
                    <Route exact path={'/admin/class/'} component={AdminClassIndexPage}/>
                    <Route exact path={'/admin/class/detail/:class/:name'} component={AdminClassDetailPage}/>
                    <Route exact path={'/admin/script/'} component={AdminScriptIndexPage}/>

                    <Route exact path={'/student'} component={StudentIndexPage}/>
                    <Route exact path={'/student/info/'} component={StudentInfoIndexPage}/>
                    <Route exact path={'/student/select/'} component={StudentSelectIndexPage}/>
                    <Route exact path={'/student/class/'} component={StudentClassIndexPage}/>
                </Switch>
            </HashRouter>
        );
    }
}

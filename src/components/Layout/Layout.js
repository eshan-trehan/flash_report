import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Profile from "../../pages/profile";
import CreateEmployee from "../../pages/createEmployee";
import CreateTask from "../../pages/createTask";
import CreateReport from "../../pages/createReport"
import CreateBank from "../../pages/createBank/CreateBank";
import Employees from "../../pages/employees";
import ProfileEmployee from "../../pages/profileEmployee";
import Tasks from "../../pages/tasks";
import Task from '../../pages/task';
import Reports from "../../pages/reports";
import Report from "../../pages/report";
import Messages from "../../pages/messages";

// context
import { useLayoutState } from "../../context/LayoutContext";

// provider
import { BankProvider } from "../../context/BankContext";
import { AdminProvider } from "../../context/AdminContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <AdminProvider>
    <BankProvider>
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              {/* Redirect to Admin Profile */}
              <Route path="/app/profile" component={Profile}/>

              {/* Employees related links */}
              <Route path="/app/employees" component={Employees}/>
              <Route path="/app/employee/:id" component={ProfileEmployee}/>
              
              {/* Tasks related links */}
              <Route path="/app/tasks" component={Tasks}/>
              <Route path="/app/task/:id" component={Task}/>
              
              {/* Reports related links */}
              <Route path="/app/reports" component={Reports}/>
              <Route path="/app/report/:id" component={Report}/>
              
              {/* Creation Related Link */}
              <Route path="/app/createEmployee" component={CreateEmployee}/>
              <Route path="/app/createTask" component={CreateTask}/> 
              <Route path="/app/createReport" component={CreateReport}/>
              <Route path="/app/createBank" component={CreateBank}/>

              {/* Messages */}
              <Route path="/app/messages" component={Messages}/>
              
              {/* Dashboard */}
              <Route path="/app/dashboard" component={Dashboard} />
              
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />}/>
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
    </BankProvider>
    </AdminProvider>
  );
}

export default withRouter(Layout);

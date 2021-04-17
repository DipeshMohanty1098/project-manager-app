import {BrowserRouter, Route, Switch, Redirect}  from 'react-router-dom';
import App from './App';
import Success from './components/successPage';
import ProjectForm from './components/createProjectForm';
import ProjectList from './components/projectList';
import ProjectOverview from './components/dashboard/projectOverview';
import IssuePage from './components/dashboard/issuePage';
import NoRoute from './components/noRoute';


//<Route exact path="/" render={() => (<ProjectForm user={props.user}/>)}/>
const Routes = (props) => {
    const prop = props.user
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path="/createProject" render={() => (<ProjectForm user={props.user}/>)}/>
        <Route exact path="/:project_name/" render={(props) => (<ProjectOverview {...props} user={prop}/>)}/>
        <Route path="/:project_name/issues/:id" render={(props) => (<IssuePage {...props} user={prop}/>)}/>
        <Route exact path="/" render={() => (<ProjectList user={props.user}/>)}/>
        <Route path ={`/success`} component={Success}/>
        <Route path={'/404'} component={NoRoute} />
        <Redirect from='*' to='/404' />
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;
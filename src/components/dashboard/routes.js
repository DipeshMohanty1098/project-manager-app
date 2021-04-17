import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Issues from './issues';
import IssuePage from './issuePage';


const IssueRoutes = () =>{
    return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/:project_name/issues/:id" component={IssuePage}></Route>
        <Route exact path="/:project_name/issues/" component={Issues}></Route>
        </Switch>
    </BrowserRouter>
    )
}

export default IssueRoutes;
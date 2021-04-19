import React from 'react';
import firebase from '../../firebase';
import {Link} from 'react-router-dom';
import Collaborators from './collaborators';
import Issues from './issues';
import Loading from '../../shared/loading';
import Error from '../dashboard/shared/error_page';
import IssueRoutes from './routes';
import Features from './features';
import GitHub from '../github_integration';

const firestore = firebase.firestore();
const projectRef = firestore.collection('Projects');

class ProjectOverview extends React.Component{
    state={
        project: null,
        collaborators: null,
        no_access: "",
        not_found: "",
        show_issues: true
    }
    componentDidMount = () => {
        console.log("props:" + this.props.user);
        projectRef.doc(this.props.match.params.project_name).onSnapshot((snapshot)=>{
            if (snapshot.exists){
                console.log("project: " + snapshot.data());
                this.setState({
                    project: snapshot.data(),
                    collaborators: snapshot.data().collaborators
                })
                if (this.state.project.collaborators.includes(this.props.user.email) === false){
                    this.setState({
                    no_access: "Sorry! You do not have access to this project!"
                    })
                }
            }
            else{
                this.setState({
                    not_found: "The project you are looking for cannot be found."
                })
            }
        })
    }
    render(){
        const state = this.state;
        const project = state.project ? (
            <div>
            <div>
                <h4 style={{color: "white", paddingLeft: "10px"}}>{state.project.projectName}</h4>
                <h6 className="right" style={{color: "white"}}>Created: {state.project.createdAt.toDate().toDateString()} at  {state.project.createdAt.toDate().toLocaleTimeString('en-US')}</h6>
                <h5 style={{color: "white", paddingLeft: "10px"}}>{state.project.description}</h5>
                <div className="content">
                <div className="nav-bar">
                <nav className="nav-extended grey darken-3">
                <div className="nav-content">
                <ul className="tabs tabs-transparent">
                <li className="tab"><Link onClick={()=>this.setState({ show_issues: false})}>Features</Link></li>
                <li className="tab"><Link class="active" onClick={()=>this.setState({ show_issues: true})}>Issues</Link></li>
                </ul>
                </div>
                </nav>
                {state.show_issues ? <Issues issues={state.project.issues} project={state.project.projectName} user={this.props.user.displayName}/> : <Features features={state.project.features} project={state.project.projectName} user={this.props.user.displayName}/>}
                </div>
                <div className="right">
                <Collaborators  collaborators={state.collaborators ? state.collaborators : ["1","2"]} user={this.props.user}/>
                <GitHub repo_name={state.project.repo_name} repo_owner={state.project.repo_owner}/>
                </div>
                </div>
            </div>
            </div>
        ): <Loading/>

        const show = state.no_access !== "" || state.not_found !== "" ? <Error error={state.no_access === "" ? state.not_found:state.no_access}/>: <div className="project">{project}</div>

        return(
            <div>
                {show}   
            </div>
        )
    }
}

export default ProjectOverview;
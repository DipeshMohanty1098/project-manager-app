import React from 'react';
import Loading from '../shared/loading';
import firebase from '../firebase';
import {Link} from 'react-router-dom';

const firestore = firebase.firestore();
const userRef = firestore.collection('Users');
const projectRef = firestore.collection('Projects');


class ProjectList extends React.Component{
    state = {
        projects: null,
        projectInfo: [],
        description: "Loading...",
    }

    componentDidMount = () =>{
        let data = null;
        userRef.doc(this.props.user.email).get().then((snapshot)=>{
            if (snapshot.exists){
                data = snapshot.data();
                this.setState({
                    projects: data.projects,
                })
            }
        })
        console.log(this.props.user.email);
        console.log(this.state.projects);
    }

    onClickCard = (projectName) =>{
        projectRef.doc(projectName).get().then((snapshot)=>{
            if (snapshot.exists){
                this.setState({
                    description: snapshot.data().description,
                })
            }
        })
    }

    render(){
        const state = this.state;
        const projects = state.projects ? (state.projects.map((project)=>{
            return (
                <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                </div>
                <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{project}<i class="material-icons right" onClick={() => this.onClickCard(project)}>more_vert</i></span>
                <p><Link to = {"/" + project}><i class="material-icons">arrow_forward</i></Link></p>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4" onClick={() => this.onClickCard(project)}>{project}<i class="material-icons right">close</i></span>
                <p>{this.state.description}</p>
                </div>
                </div>
            )
        })) : <Loading/>
        return(
            <div className="projects">
            <h4 style={{color: "white", paddingLeft: "10px"}}>Hey, {this.props.user.displayName}!</h4>
            <h6 style={{color: "white", paddingLeft: "10px"}}>What would you like to work on today? :)</h6>
            <div className="right" style={{paddingRight: "2%", paddingTop: "0.0005%"}}>
            <Link to="/createProject"><a class="btn-floating btn-large waves-effect waves-light black lighten-5"><i class="material-icons">add</i></a></Link>
            </div>
            <div className="project-list">
            {projects}
            </div>
            </div>
        )
    }
}


export default ProjectList;
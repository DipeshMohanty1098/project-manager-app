import React from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import firebase from '../firebase';
import Loading from '../shared/loading';
import {BrowserRouter, withRouter} from 'react-router-dom';

const firestore = firebase.firestore();
const userRef = firestore.collection('Users');
const projectRef = firestore.collection('Projects');

class ProjectForm extends React.Component{
    state ={
        projectName: "",
        l_projectName: 0,
        error_projectName: "",
        description: "",
        l_description: 0,
        error_description: "",
        collaborator: "",
        error_collab: "",
        success: "",
        collaborators: [],
        error_create: ""
    }

    //add self as a collaborator
    componentDidMount = async() => {
        userRef.doc(this.props.user.email).get().then((snapshot)=>{
            if (snapshot.exists){
                const data = snapshot.data()
                this.setState({
                    collaborators: [{displayName: data.displayName, email: this.props.user.email, photoURL: data.photoURL},  
                        ]
                })
            }
        })
    }

    //check if user is in db, if not, can't add as collaborator
    checkUser = (e) =>{
        this.setState({
            error_collab: "",
            success: ""
        })
        e.preventDefault();
        //can't add self as a collaborator
        if (this.props.user.email === this.state.collaborator){
            this.setState({
                error_collab: "Can't add yourself.You will be automatically added as a collaborator. "
            })
            setTimeout(()=>{
                this.setState({
                success: "",
                error_collab: "",
                })
            }, 4000)
        }
        else{
        userRef.doc(this.state.collaborator).get().then((snapshot) =>{
            //if user doesn't exist
            if (!snapshot.exists){
                this.setState({
                    error_collab: "User does not exist. Make sure user has created an account with Project Manager."
                })
                setTimeout(()=>{
                    this.setState({
                    success: "",
                    error_collab: "",
                    })
                }, 4000)
            }
            else{
                const c = this.state.collaborators;
                const email = this.state.collaborator;
                const data = snapshot.data();
                this.setState({
                    collaborators: [...c, {displayName: data.displayName, email: email, photoURL: data.photoURL}],
                    success: "Collaborator added!",
                    error_collab: "",
                    collaborator: "",
                })
                setTimeout(()=>{
                    this.setState({
                    success: "",
                    error_collab: "",
                    })
                }, 2000)
            }
        })
    }
    }

    //form handling
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
            l_projectName: this.state.projectName.length,
            l_description: this.state.description.length,
        })
        if (this.state.l_projectName > 25){
            this.setState({
                error_projectName: "Project name cannot be more than 25 characters long"
            })
        }
        else {
            this.setState({
                error_projectName: "",
            })
        }
        if (this.state.l_description > 50){
            this.setState({
                error_description: "Project description cannot be more than 50 characters long"
            })
        }
        else {
            this.setState({
                error_description: "",
            })
        }
        //console.log(this.state.projectName);
        //console.log(this.state.l_projectName);
    }

    //remove collaborator
    removeCollaborator = (email) => {
        //can't remove self from list
        if (this.props.user.email !== email){
        const c = this.state.collaborators.filter((collaborator) => {
            return collaborator.email !== email;
        })
        this.setState({
            collaborators: c
        })
    }
    }

    //create document in firestore
    submitProject = async(e) =>{
        e.preventDefault();
        this.setState({
            error_projectName: ""
        })
        //check if project name already exists, throw error 
        await projectRef.doc(this.state.projectName).get().then((snapshot)=>{
            if (snapshot.exists){
                this.setState({
                    error_projectName: "Project name already exists, please choose a different name."
                })
            }
            else{
                let collaborators = []
                for (let i =0; i< this.state.collaborators.length; i++){
                    collaborators.push(this.state.collaborators[i].email);  
                }
                for (let j =0; j< this.state.collaborators.length; j++){
                    let userData = null;
                    userRef.doc(this.state.collaborators[j].email).get().then((snapshot)=>{
                        if (!snapshot.exists){
                            console.log("Not present!!!!!");
                        }
                        userData = snapshot.data().projects;
                        console.log("userData: " + userData);
                        userRef.doc(this.state.collaborators[j].email).update({
                            projects: [...userData, this.state.projectName],
                        })
                    })
                }
                projectRef.doc(this.state.projectName).set({
                    projectName: this.state.projectName,
                    description: this.state.description,
                    collaborators: collaborators,
                    issues: [],
                    features: [],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date())
                })
                this.props.history.push("/success");
            }
        })
        
    }

    render(){
        const state = this.state
        return (     
            <BrowserRouter>    
            <h3>Create a New Project</h3>
            <div className="projectForm">
            <form>
            <label htmlFor="projectName">Enter Project Name:  </label>
            <input className="input-field" type="text" id="projectName" onChange={this.handleChange} value={state.projectName} required/>
            <p style={{color: "red"}}>{state.error_projectName}</p>
            <label htmlFor="description">Enter Project Description:  </label>
            <input className="input-field" type="text" id="description" onChange={this.handleChange} value={state.description} required/>
            <p style={{color: "red"}}>{state.error_description}</p>
            <label htmlFor="collaborator">Enter collaborator email:  </label>
            <input className="input-field" type="email" id="collaborator" onChange={this.handleChange} value={state.collaborator}/>
            <p style={{color: "red"}}>{state.error_collab}</p>
            <p style={{color: "green"}}>{state.success}</p>
            <p style={{fontWeight: "bold"}}>Collaborators added:</p>
            <ul className="collection">
            {state.collaborators.length === 0 ? <Loading/> : state.collaborators.map((collaborator)=>{
                return (
                    <div className="collectionItem">
                    <li className="collection-item avatar" >
                    <img src={collaborator.photoURL} alt="" class="circle" ></img>
                    <span className="title">{collaborator.email === this.props.user.email ? collaborator.displayName + " (You)" : collaborator.displayName}</span>
                    <p>{collaborator.email}</p>
                    <a className="secondary-content"><i className="material-icons" onClick={() => this.removeCollaborator(collaborator.email)}>clear</i></a>
                    </li>
                    </div>
                )
            })}
            </ul>
            <button className="waves-effect waves-light btn-small" onClick={this.checkUser} disabled = {state.collaborator == "" || state.collaborators.length > 5? true: false}>Add collaborator</button>
            </form>
            <div className="center">
            <br/>
            
            <button type="submit" className="waves-effect waves-light btn-small" onClick={this.submitProject} disabled = {state.error_collab != "" 
            || state.error_description !== "" || 
            state.error_projectName!=="" || 
            state.collaborators.length > 5 ||
            state.projectName === "" ||
            state.description === ""? true: false}>Create Project</button>
            </div>
            <p style={{color: "red"}}>{state.error_create}</p>
            </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(ProjectForm);
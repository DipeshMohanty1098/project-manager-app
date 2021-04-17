import React from 'react';
import firebase from '../../firebase';
import Loading from '../../shared/loading';

const projectRef = firebase.firestore().collection('Projects'); 

class IssuePage extends React.Component{
    state = {
        globalIssue: [],
        filteredissues: [],
        issue: null,
        no_access: "",
        priority: "",
        status: "",
        enable_button: true,
        success: "",
        comment: "",
        success_comment: "",
        comments: [],
    }

    componentDidMount = () => {
        console.log("MOUNTEDDDDDDD!!!!!")
        projectRef.doc(this.props.match.params.project_name).onSnapshot((snapshot)=>{
            if (snapshot.exists){
                const data = snapshot.data().issues;
                if (snapshot.data().collaborators.includes(this.props.user.email) === false){
                    this.setState({
                    no_access: "Sorry! You do not have access to this project!"
                    })
                }
                else{
                this.setState({
                    globalIssue: data,
                })
                console.log("Found:" + this.state.globalIssue);
                const filtered = this.state.globalIssue.filter((issue)=>{
                    return Number(this.props.match.params.id) !== issue.id
                })
                this.setState({
                    filteredissues: filtered,
                })
                const issue = this.state.globalIssue.filter((issue) => {
                    return issue.id === Number(this.props.match.params.id);
                })
                this.setState({
                    issue: issue,
                })
                this.setState({
                    priority: this.state.issue[0].priority,
                    comments: this.state.issue[0].comments,
                })
                this.setState({
                    status: this.state.issue[0].status,
                })
               // console.log(this.state.globalIssue);
               // console.log(this.state.filteredissues);
               // console.log(this.state.issue);
            }
            }
        })
    }


    onSave = async() => {
        const issue = this.state.issue[0];
        const issueObj = {
            title: issue.title,
            description: issue.description,
            author: issue.author,
            comments: issue.comments,
            status: this.state.status,
            priority: this.state.priority,
            createdOn: issue.createdOn,
            id: issue.id
        }
        try{
        projectRef.doc(this.props.match.params.project_name).update({
            issues: [issueObj, ...this.state.filteredissues]
        })
    } catch {
        this.setState({
            success: "Changes were not saved due to an unknown issue."
        })
    }
        this.setState({
            enable_button: false,
            success: "Changes saved!"
        })
        setTimeout(()=>{
            this.setState({
                success: ""
            })
        }, 3000);
    }

    createComment = () => {
        const issue = this.state.issue[0]
        const commentObj = {
            author: this.props.user.displayName,
            createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
            comment: this.state.comment
        }
        const comments = issue.comments
        const issueObj = {
            title: issue.title,
            description: issue.description,
            author: issue.author,
            comments: [...comments, commentObj],
            status: issue.status,
            priority: issue.priority,
            createdOn: issue.createdOn,
            id: issue.id
        }
        try{
            projectRef.doc(this.props.match.params.project_name).update({
                issues: [issueObj, ...this.state.filteredissues]
            })
        } catch {
            this.setState({
                success: "Could not add comment."
            })
        }
        this.setState({
            comment: "",
        })
        const commentState = this.state.comments
        this.setState({
            enable_button: false,
            comments: [...commentState, commentObj],
            success_comment: "Comment created!"
        })
        setTimeout(()=>{
            this.setState({
                success_comment: ""
            })
        }, 3000);
    }

    render(){
        const state = this.state
        const issue = state.issue ? (
            <div style={{width: "100%"}}>
            <h5 style={{color: "white"}}>{state.issue[0].title}</h5>
            <h6 style={{color: "white"}}>Created by:  {state.issue[0].author}</h6>
            <h6 style={{color: "white", paddingRight: "0"}} >Created on:  {state.issue[0].createdOn.toDate().toDateString()}</h6>
            <div className="right" style={{paddingRight: "10px"}}>
            <div style={{paddingTop: "33px",paddingRight: "0",paddingLeft: "15px",paddingRight:"0", display: "inline-block", width: "600px"}} className="comments">
            <ul className="collection with-header">
            <li class="collection-header"><h4>Comments</h4></li>
            <div style={{height: "215px", overflowY: "scroll"}}>
            {state.comments.length === 0 ? <p style={{paddingLeft: "10px"}}>No comments</p>: state.comments.map((comment) =>{
                return (
                    <li className="collection-item">
                    <p>{comment.comment} <br/>
                    <label style={{fontSize: "10px", paddingTop: "0"}} className="right">{comment.author + " on " + comment.createdOn.toDate().toDateString()}</label>
                    </p>
                    </li>
                )
            })}
            </div>
            </ul>
            </div>
            <div style={{display: "flex", paddingLeft: "10px"}}>
            <textarea className="materialize-textarea" style={{width: "100%", wordWrap: "break-word"}} value={state.comment} onChange={(e)=>this.setState({comment: e.target.value})} type="text" placeholder="Add a comment.."/>
            <a className="waves-effect waves-light btn" disabled={state.comment === "" || state.comment.length > 250 ? true: false} onClick={this.createComment}><i className="material-icons" >send</i></a>
            </div>
            <p style={{color:"green"}}>{state.success_comment}</p>
            </div>
            <br/>
            <br/>
            <div style={{display:"inline-block", paddingTop: "15px"}}>
            <div style={{ width: "50%"}}>
            <p style={{paddingLeft: "10px",fontWeight: "bold"}}>Issue Decription:</p>
            <p style={{paddingLeft: "10px", width: "100%"}} >{state.issue[0].description}</p>
            <p style={{paddingLeft: "10px"}}>Update Priority?</p>
            <div style={{paddingLeft: "10px", width: "500px"}}>
            <select style={{paddingLeft: "10px"}} value={state.priority} className="browser-default" style={{width: "40%"}} onChange={(e) => this.setState({priority: e.target.value})}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
            </select>
            </div>
            </div>
            <br/>
            <div className="right" style={{paddingRight: "20px", width: "100%", paddingRight: "0"}}>
            <p style={{paddingLeft: "10px"}}>Update Status?</p>
            <div style={{paddingLeft: "10px"}}>
            <select style={{paddingLeft: "10px"}} value={state.status} className="browser-default" style={{width: "40%"}} onChange={(e) => this.setState({status: e.target.value})}>
                        <option value="In Progress">In Progress</option>
                        <option value="Queued">Queued</option>
                        <option value="Fixed">Fixed</option>
            </select>
            </div>
            <br/>
            </div>
            <div style={{ paddingLeft: "10px"}}>
            <a className="waves-effect waves-light btn" disabled={(state.issue[0].priority != state.priority || state.issue[0].status != state.status) && state.enable_button ? false : true} onClick={this.onSave} style={{paddingRight: "20px", width: "250px", paddingLeft: "10px"}}>Save Changes?</a>
            </div>
            <p style={{color:"green"}}>{state.success}</p>
            </div>
            <p style={{color:"red",paddingLeft: "10px"}}>{state.comment.length > 250 ? "Comment cannot be more than 250 characters long" : ""}</p>
            </div>
        ) : <Loading/>
        return(
            <div className="issue-page">
            <p style={{color:"red"}}>{state.no_access}</p>
            {state.no_access !== "" ? <p></p> : issue}
            <div>
            </div>
            </div>
        )
    }
}

export default IssuePage;
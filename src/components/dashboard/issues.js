import React from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import Card from './shared/card';
import 'reactjs-popup/dist/index.css';
import firebase from '../../firebase';
import 'react-dropdown/style.css';

const firestore = firebase.firestore();
const projectRef = firestore.collection('Projects')

const Issues = (props) => {
    const [issue, setIssue] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPopup, setPopup] = useState(false);
    const [priority, setPriority] = useState('High');
    const [issueArray, setIssueArray] = useState(props.issues);
    const [status, setStatus] = useState("In Progress");
    const [priorityFilter, setPriorityFilter] = useState("High");
    const [filterWindow, setShowFilter] = useState(false);
    const [filteredIssues, setFilteredIssues] = useState(props.issues);

    //create new issue for the project
    const onSubmit = async() => {
        let data = null
        const issueObj = {
            id: issueArray.length + 1,
            title: issue,
            description: description,
            createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
            author: props.user,
            status: "In Progress",
            priority: priority,
            comments: []
        }
        try{
        projectRef.doc(props.project).get().then((snapshot)=>{
            if (snapshot.exists){
                data = snapshot.data().issues
            }
            projectRef.doc(props.project).update({
                issues: [issueObj, ...data]
            })
        })
        setIssue('');
        setDescription('');
        setSuccess('Your issue has been created successfully.');
        setTimeout(()=>{
            setSuccess('')
        }, 3000);
        setIssueArray([issueObj, ...issueArray]);
    } catch{
        setError("Sorry! Your issue could not be created.")
    }
    }


    //create filter
    const createFilter = () => {
        const filteredIssues = issueArray.filter((issue)=>{
            return issue.priority === priorityFilter && issue.status === status;
        })
        setFilteredIssues(filteredIssues);
        setShowFilter(false);
    }

    const issues = filteredIssues.length > 0 ? 
        (
            filteredIssues.map((issue) => {
                return (
                    <Card issue={issue} project={props.project}/>
                )
            })
        ): <p>Could not find any issues.</p>
    return(
        <div>
        <div className="issues-options" style={{paddingTop: "5px"}}>
                <a onClick={()=>setPopup(true)}>Add an issue</a>
                <Popup open={showPopup} position="bottom right" modal>
                <div className="create-issue">
                    <h5 className="left">Create new issue</h5>
                    <a onClick={()=>setPopup(false)} style={{paddingRight:0, paddingTop: "15px"}} className="right"><i className="small material-icons" style={{color: "black"}}>close</i></a>
                    <input type="text" onChange ={(e) => setIssue(e.target.value)} placeholder="Enter issue title" value={issue}/>
                    <input type="text" onChange ={(e) => setDescription(e.target.value)} placeholder="Enter issue description" value={description}/>
                    <p>Select a priority (Default is "High") </p>
                    <select value={priority} onChange={(e)=> setPriority(e.target.value)} className="browser-default">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <p style={{color:"red"}}>{error}</p>
                    <p style={{color:"green"}}>{success}</p>
                    <div className = "right">
                    <a className="waves-effect waves-light btn" onClick={onSubmit} disabled = {issue === "" ? true: false}>Create Issue</a>
                    </div>
                </div>
                </Popup>
                <a style={{paddingLeft: "10px"}} onClick={() => setShowFilter(true)}>Filter by</a>
                <Popup open={filterWindow} position="bottom right" modal>
                <div className="create-issue">
                    <div style={{display: "flex"}}>
                    <h5 className="left">Set a filter</h5>
                    <a onClick={()=>setShowFilter(false)} style={{paddingRight:0, paddingTop: "15px"}} className="right"><i className="small material-icons" style={{color: "black"}}>close</i></a>
                    </div>
                    <p>Priority:</p>
                    <select className="browser-default" value={priorityFilter} onChange={(e)=> setPriorityFilter(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    </select>
                    <br></br>
                    <p>Status:</p>
                    <select className="browser-default" value={status} onChange={(e)=> setStatus(e.target.value)}>
                    <option value="In Progress">In Progress</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Fixed">Fixed</option>
                    </select>
                    <br></br>
                    <div className = "right">
                    <a className="waves-effect waves-light btn" onClick={createFilter}>Set filter</a>
                    </div>
                </div>
                </Popup>
                <a style={{paddingLeft: "10px"}} onClick={()=>setFilteredIssues(issueArray)}>Remove Filters?</a>
            </div>
        <div className="issues">
            {issues}
        </div>
        </div>
    )
}

export default Issues;
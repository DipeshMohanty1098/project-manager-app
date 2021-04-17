import {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../../firebase';

const firestore = firebase.firestore();
const projectref = firestore.collection('Projects');


const FeatureCard = (props) => {

    const [priority, setPriority] = useState(props.issue.priority);
    const [status, setStatus] = useState(props.issue.status);
    const [button, setButton] = useState(true);

    const color = (keyword) =>{
        if (keyword === "High" ){
            return "red"
        }
        else if (keyword  === "Medium" || keyword  === "Ongoing"){
            return "yellow"
        }
        else{
            return "green"
        }
    }

    const Update = (id, title, priority, status, createdOn, createdBy) =>{
        const featureObj ={
            id: id,
            title: title,
            priority: priority,
            status: status,
            createdOn: createdOn,
            createdBy: createdBy
        }
        const featureArray = props.featureArray.filter((feature)=>{
            return feature.id !== id
        })
        projectref.doc(props.project).update({
            features: [featureObj, ...featureArray]
        })
        setButton(false);
    }

    return(
        <div className="issue-card" key = {props.issue.id}>
                    <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked">
                    <div className="card-content">
                    <div>
                    <p style={{fontSize: "30px", padding: "0"}}>{props.issue.title}</p>
                    <p className="right" style={{display: "flex"}}>Created on: <p style={{fontWeight:"bold", paddingLeft:"5px"}}>{props.issue.createdOn.toDate().toDateString()}</p></p>
                    </div>
                    <br/>
                    <p className="left" style={{ textAlign: "center"}}>Priority: {'  '} </p>
                    <br></br>
                    <div style={{paddingLeft: "0px"}}>
                    <select onChange={(e)=>setPriority(e.target.value)} value={priority} className="browser-default" style={{width: "30%"}}>
                        <option value="High" style={{color:color("High")}}>High</option>
                        <option value="Medium" style={{color:color("Medium")}}>Medium</option>
                        <option value="Low" style={{color:color("Low")}}>Low</option>
                    </select></div>
                    <div style={{display:"inline-block"}}>
                    <p>Status: {'  '} </p>
                    <div style={{paddingLeft: "0px"}}>
                    <select onChange={(e)=>setStatus(e.target.value)} value={status} className="browser-default" style={{width: "100%"}} value={status}>
                    <option value="Implemented" style={{color:color("Implemented")}}>Implemented</option>
                    <option value="Ongoing" style={{color:color("Ongoing")}}>Ongoing</option>
                    </select></div>
                    </div>
                    <br/>
                    
                    </div>
                    <div className="card-action">
                    <a className="waves-effect waves-light btn" onClick={()=> Update(props.issue.id, 
                        props.issue.title, priority,status,props.issue.createdOn,props.user)}
                        disabled={props.issue.priority != priority || props.issue.status !== status && button === false? false:true}>Update Changes?</a>
                    <p className="right" style={{display: "flex"}}>Created by:<p style={{fontWeight: "bold", paddingLeft:"5px"}}>{"  " + props.issue.createdBy}</p></p>
                    </div>
                    </div>
            </div>
            </div>
            </div>
    )
}


export default FeatureCard;
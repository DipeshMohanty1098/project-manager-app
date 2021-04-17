import React from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import FeatureCard from './shared/featureCard';
import 'reactjs-popup/dist/index.css';
import firebase from '../../firebase';
import 'react-dropdown/style.css';

const firestore = firebase.firestore();
const projectRef = firestore.collection('Projects')

const Features = (props) => {
    const [feature, setFeature] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPopup, setPopup] = useState(false);
    const [priority, setPriority] = useState('High');
    const [featureArray, setfeatureArray] = useState(props.features);
    const [status, setStatus] = useState("In Progress");
    const [priorityFilter, setPriorityFilter] = useState("High");
    const [filterWindow, setShowFilter] = useState(false);
    const [filteredFeatures, setFilteredFeatures] = useState(props.features);

    //create new feature for the project
    const onSubmit = async() => {
        let data = null
        const featureObj = {
            id: featureArray.length + 1,
            title: feature,
            createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
            createdBy: props.user,
            status: "In Progress",
            priority: priority,
        }
        try{
        projectRef.doc(props.project).get().then((snapshot)=>{
            if (snapshot.exists){
                data = snapshot.data().features
            }
            projectRef.doc(props.project).update({
                features: [featureObj, ...data]
            })
        })
        setFeature('');
        setSuccess('Feature has been added.');
        setTimeout(()=>{
            setSuccess('')
        }, 3000);
        setfeatureArray([featureObj, ...featureArray]);
    } catch{
        setError("Sorry! Could not create a new feature.")
    }
    }


    //create filter
    const createFilter = () => {
        const filteredFeatures = featureArray.filter((issue)=>{
            return issue.priority === priorityFilter && issue.status === status;
        })
        setFilteredFeatures(filteredFeatures);
        setShowFilter(false);
    }

    const features = filteredFeatures.length > 0 ? 
        (
            filteredFeatures.map((feature) => {
                return (
                    <FeatureCard issue={feature} project={props.project} featureArray={featureArray} user={props.user}/>
                )
            })
        ): <p>Could not find any features tagged to this project.</p>
    return(
        <div>
        <div className="issues-options" style={{paddingTop: "5px"}}>
                <a onClick={()=>setPopup(true)}>Add a feature</a>
                <Popup open={showPopup} position="bottom right" modal>
                <div className="create-issue">
                    <h5 className="left">Add a feature</h5>
                    <a onClick={()=>setPopup(false)} style={{paddingRight:0, paddingTop: "15px"}} className="right"><i className="small material-icons" style={{color: "black"}}>close</i></a>
                    <input type="text" onChange ={(e) => setFeature(e.target.value)} placeholder="Enter issue description" value={feature}/>
                    <p>Select a priority (Default is "High") </p>
                    <select value={priority} onChange={(e)=> setPriority(e.target.value)} className="browser-default">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <p style={{color:"red"}}>{error}</p>
                    <p style={{color:"green"}}>{success}</p>
                    <div className = "right">
                    <a className="waves-effect waves-light btn" onClick={onSubmit} disabled = {feature === "" ? true: false}>Add a feature</a>
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
                    <option value="Implemented">Implemented</option>
                    <option value="Ongoing">Ongoing</option>
                    </select>
                    <br></br>
                    <div className = "right">
                    <a className="waves-effect waves-light btn" onClick={createFilter}>Set filter</a>
                    </div>
                </div>
                </Popup>
                <a style={{paddingLeft: "10px"}} onClick={()=>setFilteredFeatures(featureArray)}>Remove Filters?</a>
            </div>
        <div className="issues">
            {features}
        </div>
        </div>
    )
}

export default Features;


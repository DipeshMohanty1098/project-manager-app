import React from 'react';

const Filter = (props) =>{

    return (
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
    )
}
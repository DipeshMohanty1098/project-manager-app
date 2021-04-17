import React from 'react';
import {Link} from 'react-router-dom';

const Card = (props) => {

    const color = (priority) =>{
        if (priority === "High"){
            return "red"
        }
        else if (priority === "Medium"){
            return "yellow"
        }
        else{
            return "green"
        }
    }

    return(
        <div className="issue-card" key = {props.issue.id}>
                    <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked">
                    <div className="card-content">
                    <p style={{fontSize: "30px", padding: "0"}}>{props.issue.title}</p>
                    <br/>
                    <p className="left" style={{display: "flex"}}>Priority: <p style={{fontWeight:"bold", color:color(props.issue.priority), paddingLeft:"5px"}}>{props.issue.priority}</p></p>
                    <p className="right" style={{display: "flex"}}>Status: <p style={{fontWeight:"bold", paddingLeft:"5px"}}>{props.issue.status}</p></p>
                    <br/>
                    <br/>
                    <p className="right" style={{display: "flex"}}>Created on: <p style={{fontWeight:"bold", paddingLeft:"5px"}}>{props.issue.createdOn.toDate().toDateString()}</p></p>
                    </div>
                    <div className="card-action">
                    <Link to={"/" + props.project + "/issues/" + props.issue.id}>View</Link>
                    <p className="right" style={{display: "flex"}}>Created by:<p style={{fontWeight: "bold", paddingLeft:"5px"}}>{"  " + props.issue.author}</p></p>
                    </div>
                    </div>
            </div>
            </div>
            </div>
    )
}

export default Card;
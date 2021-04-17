import React from 'react';
import {Link} from 'react-router-dom';


const Error = (props) =>{
    return (
        <div className="error-page">
            <h3 style={{color: "red"}}>{props.error}</h3>
            <Link to='/'><a style={{fontSize: "20px"}}>Back to home?</a></Link>
        </div>
    )
}

export default Error;
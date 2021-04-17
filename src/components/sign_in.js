import Gist from './sign_in_carousel'
import React from 'react';
let Logo = require('../assets/Logo.png');




const Sign_In = (props) =>{
    return (
        <div className="sign-in">
            <h3>Welcome to Project Manager!</h3>
            <h4>Keep track of your Personal Projects, hassle free!</h4>
            <br/>
            <br/>
            <a className="waves-effect waves-light btn white" onClick = {props.signIn}><p style={{color:"black"}}>Sign In/Register with Google</p></a>
        </div>
    )
}

export default Sign_In;
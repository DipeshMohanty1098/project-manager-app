import Gist from './sign_in_carousel'
import {useState} from 'react';
let Logo = require('../assets/Logo.png');




const Sign_In = (props) =>{
    const [index, setIndex] = useState(0)
    const gists = ["Track your Personal Projects with ease.", "Track the progress of issues/features of your Projects!", "Add collaborators to your Project!"]
    return (
        <div>
        <div className="sign-in">
            <h3>Welcome to Project Manager!</h3>
            <h4>Keep track of your Personal Projects, hassle free!</h4>
            <br/>
            <br/>
            <a className="waves-effect waves-light btn white" onClick = {props.signIn}><p style={{color:"black"}}>Sign In/Register with Google</p></a>
        <br/>
        <br/>
        <br/>
        <Gist/>
        </div>
        </div>
    )
}

export default Sign_In;
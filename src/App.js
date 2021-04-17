import './App.css';
import firebase from './firebase';
import 'firebase/firestore';
import 'firebase/auth';
import {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ProjectForm from './components/createProjectForm';
import Routes from './routes';
import Sign_In from './components/sign_in';
import {BrowserRouter, withRouter} from 'react-router-dom';



const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? <Home user={user} /> : <SignIn/>}
    </div>
  );
}

function SignIn(){
  const signIn = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div>
      <Sign_In signIn={signIn}/>
    </div>
  )
}



function Home(props){
  const user = props.user; 
  const usersRef = firestore.collection('Users');
  let data = null;
  const createUser = async() => {
    const usersRef = firestore.collection('Users');
    const {uid, displayName, photoURL, email} = auth.currentUser;
    usersRef.doc(email).get().then((snapshot)=>{
      if (!snapshot.exists){
        usersRef.doc(email).set({
          displayName,
          uid,
          photoURL,
          projects: [],
          role: 'Developer'
        })
      }
    })
  }
 
  useEffect(()=>{
    createUser();
  }, []);
  return auth.currentUser && (
    <div className="home">
    <nav className="nav-extended grey">
    <div className="nav-wrapper">
    <a className="brand-logo" style={{paddingLeft: "10px", color: "black"}}>Project Manager</a>
    <ul className="right hide-on-med-and-down" id="nav-mobile">
      <li><a onClick={() => auth.signOut()} >Sign Out</a></li>
    </ul>
    </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
    <li><a onClick={() => auth.signOut()}>Sign Out</a></li>
    </ul>
    <Routes user={user}/>
    </div>
    )}
  

export default App;


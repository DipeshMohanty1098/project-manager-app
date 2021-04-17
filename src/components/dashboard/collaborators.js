import React from 'react';
import firebase from '../../firebase';
import Loading from '../../shared/loading';

const firestore  = firebase.firestore();
const userRef = firestore.collection('Users');

class Collaborators extends React.Component{
    state = {
        userObjects: [],
    }

    componentDidMount = () => {
        console.log("collab array: " + this.props.collaborators);
        for (let i = 0; i<this.props.collaborators.length; i++){
            userRef.doc(this.props.collaborators[i]).get().then((snapshot) => {
                if (snapshot.exists){
                    const oldData = this.state.userObjects;
                    this.setState({
                        userObjects: [...oldData, {...snapshot.data(), email: this.props.collaborators[i]}]
                    })
                }
            })
        }
    }

    render(){
        const state = this.state
        const userInfo = state.userObjects.length > 0 ? state.userObjects.map((user1)=>{
            return (
                <div className="collectionItem" key={user1.email}>
                <li className="collection-item avatar" >
                <img src={user1.photoURL} alt="" class="circle" ></img>
                <span className="title">{user1.email === this.props.user.email ? user1.displayName + " (You)" : user1.displayName}</span>
                <p>{user1.email}</p>
                </li>
                </div>
            )
        }) : <Loading/>
        return (
            <div>
            <h5 style={{paddingLeft: "15px", color: "white",  fontSize:"30px"}}>Collaborators</h5>
            <div className="collaborator-list">
            <ul className="collection">
                {userInfo}
            </ul>
            </div>
            </div>
        )
    }
}

export default Collaborators;
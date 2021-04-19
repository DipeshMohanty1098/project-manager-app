import React from 'react';
import Loading from '../shared/loading';


class GitHub extends React.Component{
    state={
        updates: null,
        message: ""
    }
    componentDidMount = () => {
        if (this.props.repo_name === ""){
            this.setState({
                message: "You have not linked your GitHub Repository, so, you won't be able to view the latest updates."
            })
        }
        else{
            fetch('https://api.github.com/repos/' + this.props.repo_owner + '/' + this.props.repo_name).then((res)=>{
                if (res.ok){
                    return res.json()
                    
                }
                else if (res.message==="Not Found"){
                    console.log("message:" + res.message)   
                }
            }).then((data)=>{
                console.log("data:" + data)
                this.setState({
                    updates: data,
                })
                console.log("GITHUB: " + this.state.updates.updated_at);
            })
        }
    }
    render() {
        const state = this.state;
        const updates = state.updates ? <div>
            <p>{state.updates.pushed_at}</p>
            <p>{state.updates.updated_at}</p>
           <p>{state.updates.created_at}</p>
        </div> : <Loading/>
        return (
            <div className="github-updates">
                {state.message === "" ? updates : <p style={{color: "red"}}>{state.message}</p>}
            </div>
        )
    }
}

export default GitHub;
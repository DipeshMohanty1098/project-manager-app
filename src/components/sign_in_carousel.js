import {useState} from 'react'

const Gist = () =>{
    const [index, setIndex] = useState(0)
    const gists = ["Track your Personal Projects with ease.", "Track the progress of issues/features of your Projects!", "Add collaborators to your Project!"]
    return(
        <div className="introduction" style={{display:"flex", width: "100%", margin: "0 auto"}}>
            <a className="waves-effect waves-light btn white"><i style={{fontSize: "25px",color:"black"}} className="material-icons" onClick={()=>setIndex(index === 0 ? 2: index-1)}>arrow_back</i></a>
            <h5 className="intro-text" style={{width: "100%",paddingLeft: "100px", paddingRight: "100px", animation: "fadeIn 2s"}}>{gists[index]}</h5>
            <a className="waves-effect waves-light btn white"><i style={{fontSize: "25px", color:"black"}} className="material-icons" onClick={()=>setIndex(index===2 ? 0: index +1)}>arrow_forward</i></a>
        </div>
    )
}

export default Gist;
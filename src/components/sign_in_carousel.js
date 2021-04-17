

const Gist = () =>{
    const gists = ["Track your Personal Projects with ease.", "Track the progress of issues/features of your Projects!", "Add collaborators to your Project!"]
    return(
        <div className="carousel">
        {gists.map((gist)=>{
            <a className="carousel-item"><h5>{gist}</h5></a>
        })}
        </div>
    )
}

export default Gist;
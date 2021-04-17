import {Link} from 'react-router-dom';

const Success = () => {
    return (
        <div className="Success">
        <h1>Success, Project Created, you can view it in your dashboard.</h1>
        <Link to="/">Back to home.</Link>
        </div>
    )
}

export default Success;
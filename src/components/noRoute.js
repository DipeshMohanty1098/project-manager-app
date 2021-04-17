import {Link} from 'react-router-dom';
const NoRoute = () => {
    return (
        <div className="no-route">
            <h4>Could not find what you are looking for.</h4>
            <Link to='/'>Back to home?</Link>
        </div>
    )
}

export default NoRoute;
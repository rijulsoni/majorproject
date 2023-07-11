import notFound from '../images/404-not-found.svg';
import { Link } from 'react-router-dom';

const NoPageFound = () => {
    return (
        
        <div className="mt-16 d-flex flex-column gap-4 align-items-center justify-content-center">
    <img className="sm:w-1/3" src={notFound} alt="Page Not Found" height="500px"/>
    <Link to="/" className="px-4 py-2  rounded-sm text-white text-uppercase shadow hover-shadow-lg" style={{marginTop:"20px",backgroundColor:"blue",marginBottom:"10px"}}>Back To Home</Link>
</div>

    );
};

export default NoPageFound;

import { Link } from "react-router-dom"
import './navbar.css';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/exercises">Exercises</Link>
        </nav>
    )
}
export default Navbar